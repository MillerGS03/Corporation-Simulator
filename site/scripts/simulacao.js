$(".graficosSimulacao").css('display', 'none')
var contas;
var classificacoes;
var dataCriacao = new Date(simulacao.DataCriacao);
var mesAtual = dataCriacao.getMonth()+1;
var diaAtual = dataCriacao.getDate();
var anoAtual = (dataCriacao.getFullYear() + '');
anoAtual = anoAtual.substring(2);
var chartConta;
var chartSaldo;
var chartClass;
var pontosSaldo = new Array();
var pontosConta = new Array();
var pontosClass = new Array();


var aux = new Object();
aux.label = formatarData(mesAtual, anoAtual);
aux.y = simulacao.Saldo;
pontosSaldo.push(aux);
function atualizarData()
{
	if (new Date().getMonth()+1 != mesAtual)
	{
		mesAtual = new Date().getMonth() + 1;
		if (new Date().getFullYear() != anoAtual)
		{
			anoAtual = new Date().getFullYear() + '';
			anoAtual = anoAtual.substring(2);
		}
		return true;
	}
	else
		return false;
}
function atualizarPontosSaldo()
{
	if (atualizarData())
	{
		aux = new Object();
		aux.label = formatarData(mesAtual, anoAtual);
		aux.y = simulacao.Saldo;
		pontosSaldo.push(aux)
	}
	else
		pontosSaldo[pontosSaldo.length-1].y = simulacao.Saldo;
	if (chartSaldo != null)
		chartSaldo.render();
}
function atualizarPontosConta()
{
	var total = 0;
	for (var i = 0; i < contas.length; i++)
		total += Math.abs(contas[i].Valor);
	for (var i = 0; i < contas.length; i++)
	{
		aux = new Object();
		aux.label = contas[i].Nome;
		aux.y = Math.abs(contas[i].Valor)/total * 100;
		aux.y = aux.y.toFixed(3);
		pontosConta[i] = aux;
	}
	if (chartConta != null)
		chartConta.render();
}
function atualizarPontosClass()
{
	for (var i = 0; i < classificacoes.length; i++)
	{
		aux = new Object();
		aux.label = classificacoes[i].Nome;
		aux.y = 0;
		for (var k = 0; k < contas.length; k++)
			if (contas[k].CodClassificacao == classificacoes[i].CodClassificacao)
				aux.y += contas[k].Valor;
		if (aux.y < 0)
			aux.color = 'darkred';
		else
			aux.color = 'green';
		pontosClass[i] = aux;
	}
	if (chartClass != null)
		chartClass.render();
}
setInterval(atualizarPontosSaldo, 1000)
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

function criarGraficoSaldo()
{
	chartSaldo = new CanvasJS.Chart("saldo", {
		animationEnabled: true,
		zoomEnabled: true,
		title:{text: "Saldo"},
		data:
		[{
			type: "line",
			dataPoints: pontosSaldo
		}]
	});
	chartSaldo.render();
}
function criarGraficoConta()
{
	chartConta = new CanvasJS.Chart("contas", {
		animationEnabled: true,
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		culture: 'es',
		title: {text: "Contas"},
		data: [{
			type: "pie",
			startAngle: 25,
			toolTipContent: "<b>{label}</b>: {y}%",
			showInLegend: "true",
			legendText: "{label}",
			indexLabelFontSize: 16,
			indexLabel: "{label} - {y}%",
			indexLabelPlacement: "outside",
			dataPoints: pontosConta
		}]
	});
	chartConta.render();
}
function criarGraficoClass()
{
	chartClass = new CanvasJS.Chart("classif", {
		animationEnabled: true,
		culture: 'es',
		title:{text: "Classificações"},
		data:
		[{
			type: "column",
			indexLabel: "{y}",
			indexLabelPlacement: "outside",
			dataPoints: pontosClass
		}]
	});
	chartClass.render();
}
function formatarData(dia, mes, ano)
{
	var data = (dia < 10?"0" + dia:dia) + "/" + (mes < 10?"0" + mes:mes);
	if (ano != null)
		data += "/" + (ano < 10?"0" + ano:ano);
	return data;
}
setTimeout(function(){
	atualizarPontosSaldo();
	criarGraficoSaldo();
	atualizarPontosConta();
	criarGraficoConta();
	atualizarPontosClass();
	criarGraficoClass();
}, 100)