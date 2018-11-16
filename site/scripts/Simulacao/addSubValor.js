var classifA = 1;
$.get('http://' + local + ':3000/getClassificacoes').done(function(dados){classifA = dados[0].CodClassificacao})
$("#sairModal").on('click', function(){
    $("#modal").css('display', 'none');
    $.get('http://' + local + ':3000/simulacoes/' + user.CodUsuario + '/' + simulacao.Nome, function(dados) {
        simulacao = dados[0];
    })
})
$("#txtSub").on('click', function(){
    $("#sub").prop('checked', true)
    $("#insere").text("Insira o valor a ser " + ($("#add").is(':checked')?"adicionado":"subtraído") + ":");
    $("#txtValor").css('display', 'block')
    $(".btnAddSub").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar agora')
    else
        $("#fim").text('Subtrair agora')
})
$("#txtAdd").on('click', function(){
    $("#add").prop('checked', true)
    $("#insere").text("Insira o valor a ser " + ($("#add").is(':checked')?"adicionado":"subtraído") + ":");
    $("#txtValor").css('display', 'block')
    $(".btnAddSub").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar agora')
    else
        $("#fim").text('Subtrair agora')
    
})
function colocarSaldo()
{
    $("#saldoAtual").text('Saldo atual: ' + simulacao.Saldo)
}
colocarSaldo();

$("input[name='type']").on('change', function(){
    $("#insere").text("Insira o valor a ser " + ($("#add").is(':checked')?"adicionado":"subtraído") + ":");
    $("#txtValor").css('display', 'block')
    $(".btnAddSub").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar agora')
    else
        $("#fim").text('Subtrair agora')
})
document.getElementById('fim').onclick = function(){
    if (!isNaN($("#txtValor").val()) && $("#txtValor").val() >= 0)
    {
        var saldo = parseInt($("#txtValor").val());
        if ($("#sub").is(':checked'))
            saldo = -saldo;
        var aux = new Object();
        aux.Intervalo = '';
        aux.Nome = '';
        aux.Classificacao = classifA;
        aux.Marcado = 1;
        aux.Valor = saldo;
        aux.DiaPerdaGanho = new Date();
        aux.CodSimulacao = simulacao.CodSimulacao;
        $.post('http://' + local + ':3000/addConta/' + simulacao.CodSimulacao, aux)
        setTimeout(function(){$.get('http://' + local + ':3000/getContas/' + simulacao.CodSimulacao).done(function(dados){contas = dados;})}, 50)
        simulacao.Saldo += saldo;
        $("#sairModal").trigger('click');
        $.ajax({
            url: 'http://' + local + ':3000/UpdateSimulacao',
            type: 'patch',
            data: simulacao
        })
        setTimeout(function(){
            $.ajax({url:'http://' + local + ':3000/simulacoes/' + user.CodUsuario + '/' + simulacao.Nome}).done(function(dados){
                simulacao = dados[0];
                criarGraficoSaldo()
            })}, 15)
    }
    else
    {
        $("#insere").css('color', 'darkred')
        $("#insere").text('Insira um número positivo válido')
    }
}
$("#marcar").on('click', function(){
    $("#marcarData").css('display', 'block')
    return false;
})
$("#marcarData").on('change', function(){
    $("#OkAddSub").css('display', 'block')
})
$("#OkAddSub").on('click', function(){
    if (!isNaN($("#txtValor").val()) && $("#txtValor").val() >= 0)
    {
        var saldo = parseInt($("#txtValor").val());
        if ($("#sub").is(':checked'))
            saldo = -saldo;
        var data = new Date($("#marcarData").val());
        var aux = data.toUTCString();
        aux = aux.substring(0, aux.length-5);
        var dataVerdadeira = new Date(aux)
        var hoje = new Date();
        if (data > hoje)
        {
            var aux = new Object();
            aux.Intervalo = '';
            aux.Nome = '';
            aux.Classificacao = classifA;
            aux.Marcado = 1;
            aux.Valor = saldo;
            aux.DiaPerdaGanho = dataVerdadeira;
            aux.CodSimulacao = simulacao.CodSimulacao;
            $.post('http://' + local + ':3000/addConta/' + simulacao.CodSimulacao, aux);
            $.ajax({
                url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
            }).done(function(dados){contas = contas.concat(dados);})
            $("#sairModal").trigger('click');
            return false;
        }
        else
            alerta('Selecione uma data válida')
    }
    else
    {
        $("#insere").css('color', 'darkred')
        $("#insere").text('Insira um número positivo válido')
    }
    return false;
})
$("#txtValor").on('keydown', function(e){
    if (e.which == 13)
    {
        setTimeout(function(){
            $("#fim").trigger('click')
        }, 15)
        return false;
    }
})