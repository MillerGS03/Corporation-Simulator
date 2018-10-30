var contas;
var classificacoes;
var saldo = new Array();
var dataCriacao = new Date(simulacao.DataCriacao);
var mesAtual = dataCriacao.getMonth()+1;
var diaAtual = dataCriacao.getDate();
var anoAtual = (dataCriacao.getFullYear() + '');
anoAtual = anoAtual.substring(2);
var X = 1;
var pontos = new Array();
var aux = new Object();
aux.label = formatarData(mesAtual, anoAtual);
aux.y = simulacao.Saldo;
aux.x = X++;
pontos.push(aux);
function atualizarPontos()
{
	if (new Date().getMonth()+1 != mesAtual)
	{
		mesAtual = new Date().getMonth() + 1;
		if (new Date().getFullYear() != anoAtual)
		{
			anoAtual = new Date().getFullYear() + '';
			anoAtual = anoAtual.substring(2);
		}
		aux = new Object();
		aux.label = formatarData(mesAtual, anoAtual);
		aux.y = simulacao.Saldo;
		a.x = X++;
		pontos.push(aux)
	}
	else
	{
		pontos[pontos.length-1].y = simulacao.Saldo;
	}
	criarGrafico();
}
setInterval(atualizarPontos, 10000)
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

function criarGrafico()
{
	var chart = new CanvasJS.Chart("saldo", {
		title:{
			text: "Saldo"              
		},
		data:
		[{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "line",
			dataPoints: pontos
		}]
	});
	chart.render();
}
function formatarData(dia, mes, ano)
{
	var data = (dia < 10?"0" + dia:dia) + "/" + (mes < 10?"0" + mes:mes);
	if (ano != null)
		data += "/" + (ano < 10?"0" + ano:ano);
	return data;
}
criarGrafico();