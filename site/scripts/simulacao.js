var contas;
$("#nomeSimulacao").text(simulacao.Nome);

$("#addConta").on('click', function() {
	abrirS('adicionarConta.html');
});
$.ajax({
	url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
}).done(function(dados){contas = dados;})

function abrirS(l)
{
	$("#modal-content").empty();
	$("#modal-content").load("html/paginasSimulacao/" + l);
	$("#modal").css('display', 'block');
}