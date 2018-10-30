var contas;
var classificacoes;
$("#nomeSimulacao").text(simulacao.Nome);

$("#addSub").on('click', function(){
	abrirS('addSubValor.html');
})
$("#addConta").on('click', function() {
	abrirS('adicionarConta.html');
});
$("#removerConta").on('click', function() {
	abrirS('removeConta.html');
});
$("#atualizarConta").on('click', function(){
	abrirS('atualizarConta.html');
})
$("#tabelas").on('click', function(){
	abrirS('tabelas.html');
})
$.ajax({
	url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
}).done(function(dados){contas = dados;})
$.ajax({
	url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
}).done(function(dados) {classificacoes = dados});

function abrirS(l)
{
	$("#modal-content").empty();
	$("#modal-content").load("html/paginasSimulacao/" + l);
	$("#modal").css('display', 'block');
}

function confirma(txt, funcao)
{
	var str = '<div id="modalConfirma" class="modal"><div id="modalConfirma-content">'+
	'<span class="btnSair" id="sairModalConfirma"></span>'+
	'<h1 id="txtConfirma">Deseja realmente ' + txt + '?</h1>'+
	'<button id="btnSim">Sim</button>'+
	'<button id="btnCancelar">Cancelar</button>'+
	'</div></div>'
	$("#painelConta").append(str)
	$("#modalConfirma").css('display', 'block');
	$("#sairModalConfirma").on('click', function(){
		$("#modalConfirma").css('display', 'none');
	})
	$("#btnSim").on('click', function(){
		funcao();
		$("#modalConfirma").css('display', 'none');
	})
	$("#btnCancelar").on('click', function(){
		$("#modalConfirma").css('display', 'none');
	});
}