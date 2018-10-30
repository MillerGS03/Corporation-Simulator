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
    $("#fim").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar')
    else
        $("#fim").text('Subtrair')
})
$("#txtAdd").on('click', function(){
    $("#add").prop('checked', true)
    $("#insere").text("Insira o valor a ser " + ($("#add").is(':checked')?"adicionado":"subtraído") + ":");
    $("#txtValor").css('display', 'block')
    $("#fim").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar')
    else
        $("#fim").text('Subtrair')
    
})
function colocarSaldo()
{
    $("#saldoAtual").text('Saldo atual: ' + simulacao.Saldo)
}
colocarSaldo();

$("input[name='type']").on('change', function(){
    $("#insere").text("Insira o valor a ser " + ($("#add").is(':checked')?"adicionado":"subtraído") + ":");
    $("#txtValor").css('display', 'block')
    $("#fim").css('display', 'block')
    if($("#add").is(':checked'))
        $("#fim").text('Adicionar')
    else
        $("#fim").text('Subtrair')
})
$("#fim").on('click', function(){
    var saldo = parseInt($("#txtValor").val());
    if ($("#sub").is(':checked'))
        saldo = -saldo;
    saldo = saldo + simulacao.Saldo;
    $.ajax({
        url: 'http://' + local + ':3000/simulacao/' + simulacao.CodSimulacao + '/saldo/' + saldo,
        type: 'patch'
    })      
    $("#sairModal").trigger('click');
    $.get('http://' + local + ':3000/simulacoes/' + user.CodUsuario + '/' + simulacao.Nome, function(dados) {
        simulacao = dados[0];
        atualizarPontosSaldo();
    })
    return false;
})