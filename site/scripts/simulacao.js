var tema = 'light';
//$("#saldo").css('display', 'none')
$("#contas").css('display', 'none')
$("#classif").css('display', 'none')
$("#tema").on('click', function(){
	if (tema == 'light')
		tema = 'dark';
	else
		tema = 'light';
	chartSaldo.destroy();
	chartConta.destroy();
	chartClass.destroy();
	criarGraficoClass();
	criarGraficoConta();
	criarGraficoSaldo();
	setTimeout(function(){}, 100)
})
var contas;
var classificacoes;
$.ajax({
	url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
}).done(function(dados){contas = dados;})
$.ajax({
	url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
}).done(function(dados) {classificacoes = dados});
var diaAtual = simulacao.DataCriacao + '';
diaAtual = diaAtual.substring(0, diaAtual.length-1);
diaAtual = new Date(diaAtual);
var hoje = new Date();
var chartConta;
var chartSaldo;
var chartClass;
var pontosSaldo = new Array();
var pontosConta = new Array();
var pontosClass = new Array();
function primeiroSaldo()
{
	var x = simulacao.DataCriacao + '';
	var atual = new Date(x.substring(0, x.length-1));
	var aux = new Object();
	aux.x = atual;
	aux.y = 0;
	pontosSaldo.push(aux)
}
primeiroSaldo();

function atualizarData()
{
	hoje = new Date();
	if (hoje > diaAtual)
	{
		var diff = Math.abs(Math.round((diaAtual.getTime() - new Date().getTime())/86400000))
		diaAtual = hoje;
		return diff;
	}
	else
		return 0;
}
function atualizarPontosSaldo()
{
	var diff = atualizarData();
	if (diff > 0)
	{
		var x = simulacao.DataCriacao + '';
		x = x.substring(0, x.length-1);
		var atual = new Date(x);
		var y = 0;
		for (var i = 0; i < diff; i++)
		{
			atual.setDate(atual.getDate() + 1);
			y += (contas!=null?verificarPerdaGanho(atual):0)
			aux = new Object();
			aux.x = atual;
			aux.y = y;
			pontosSaldo.push(aux)
		}
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
		if (contas[i].Marcado == 0)
			total += Math.abs(contas[i].Valor);
	for (var i = 0; i < contas.length && contas[i].Marcado == 0; i++)
	{
		aux = new Object();
		aux.label = contas[i].Nome;
		aux.y = Math.abs(contas[i].Valor)/total * 100;
		aux.y = aux.y.toFixed(3);
		aux.color = (contas[i].Valor<0?"darkred":"green");
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
var iSaldo = setInterval(atualizarPontosSaldo, 100)
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
$('#previsao').on('click', function(){
	abrirS('previsao.html');
})

function abrirS(l)
{
	$("#modal-content").empty();
	$("#modal-content").load("html/paginasSimulacao/" + l);
	$("#modal").css('display', 'block');
}

function criarGraficoSaldo()
{
	chartSaldo = new CanvasJS.Chart("saldo", {
		animationEnabled: true,
		theme: tema + '1',
		zoomEnabled: true,
		axisX: {title: "Dias", valueFormatString: "DD/MM/YY"},
		axisY: {title: "Saldo", prefix: '$'},
		title: {text: "Saldo: " + simulacao.Saldo},
		data:
		[{
			type: "line",
			color: $("#conteudoInfo").css("background-color"),
			dataPoints: pontosSaldo
		}]
	});
	chartSaldo.render();
}
function criarGraficoConta()
{
	chartConta = new CanvasJS.Chart("contas", {
		animationEnabled: true,
		theme: tema + '1',
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
		theme: tema + '1',
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
}, 500)
function verificarPerdaGanho(dia)
{
	var total = 0;
	for (var i = 0; i < contas.length; i++)
	{
		var dS = contas[i].DiaPerdaGanho + '';
		dS = dS.substring(0, dS.length-1);
		var d = new Date(dS);
		if (d.getDate() == dia.getDate() &&
		d.getMonth() == dia.getMonth() &&
		d.getFullYear() == dia.getFullYear())
		{
			var novo = new Date(dS);
			if (contas[i].IntervaloDeTempo.substring(contas[i].IntervaloDeTempo.length-1) == 'D')
				novo.setDate(novo.getDate() + parseInt(contas[i].IntervaloDeTempo.substring(0, contas[i].IntervaloDeTempo.length-1)))
			else if (contas[i].IntervaloDeTempo.substring(contas[i].IntervaloDeTempo.length-1) == 'M')
				novo.setMonth(novo.getMonth() + parseInt(contas[i].IntervaloDeTempo.substring(0, contas[i].IntervaloDeTempo.length-1)))
			else
				novo.setFullYear(novo.getFullYear() + parseInt(contas[i].IntervaloDeTempo.substring(0, contas[i].IntervaloDeTempo.length-1)))
			
			total += contas[i].Valor;

			if (contas[i].Marcado == 0)
				contas[i].DiaPerdaGanho = novo;
			else
				$.ajax({
				url: 'http://' + local + ':3000/excluirConta/' + contas[i].CodPatrimonio,
				type: 'delete'})
		}
	}
	return total;
}
function finalizarSimulacao()
{
	clearInterval(iSaldo);
	$.ajax({
		url: 'http://' + local + ':3000/UpdateSimulacao',
		type: 'patch',
		data: simulacao
	})
	for (var i = 0; i < contas.length; i++)
		$.ajax({
			url: 'http://' + local + ':3000/contas/' + contas[i].CodPatrimonio,
			type: 'patch',
			data: contas[i]
		})
}
function carregar()
{
	$.ajax({
		url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
	}).done(function(dados){contas = dados;})
	$.ajax({
		url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
	}).done(function(dados) {classificacoes = dados});
	pontosSaldo = JSON.parse(simulacao.PontosSaldo);
	if (pontosSaldo == null)
		primeiroSaldo();
}