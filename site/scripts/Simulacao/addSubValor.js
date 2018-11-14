var classifA = 1;
$.get('http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao).done(function(dados){classifA = dados[0].CodClassificacao})
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
$("#fim").on('click', function(){
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
        $.post('http://' + local + ':3000/addConta/' + simulacao.CodSimulacao, aux).done(function(){
            $.get('http://' + local + ':3000/getContas/' + simulacao.CodSimulacao).done(function(dados){contas = dados; console.log(contas)})
        })
        saldo = saldo + simulacao.Saldo;
        $.ajax({
            url: 'http://' + local + ':3000/simulacao/' + simulacao.CodSimulacao + '/saldo/' + saldo,
            type: 'patch'
        })      
        $("#sairModal").trigger('click');
        $.get('http://' + local + ':3000/simulacoes/' + user.CodUsuario + '/' + simulacao.Nome, function(dados) {
            simulacao = dados[0];
            atualizarPontosSaldo();
            chartSaldo.destroy();
            criarGraficoSaldo();
        })
    }
    else
    {
        $("#insere").css('color', 'darkred')
        $("#insere").text('Insira um número positivo válido')
    }
    return false;
})
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
            console.log(aux)
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