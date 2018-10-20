var nomeSimulacao = "algumaCoisaAi hehe";
$("#nomeSimulacao").text(nomeSimulacao);

$("#addConta").on('click', function() {
	abrirS('adicionarConta.html');
});

function abrirS(local)
{
	$("#modal-content").empty();
	$("#modal-content").load("html/paginasSimulacao/" + local);
	$("#modal").css('display', 'block');
}