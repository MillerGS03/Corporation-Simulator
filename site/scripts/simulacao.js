//("#saldo").css('display', 'none')
$("#contas").css('display', 'none')
$("#classif").css('display', 'none')
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


function atualizarData()
{
	hoje = new Date();
	if (hoje.getDate() != diaAtual.getDate())
	{
		var diff = hoje.getDate() - diaAtual.getDate(); 
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
		for (var i = 0; i <= diff; i++)
		{
			var x = simulacao.DataCriacao + '';
			x = x.substring(0, x.length-1);
			var atual = new Date(x);
			atual.setDate(atual.getDate() + i);
			simulacao.Saldo += verificarPerdaGanho(atual);
			aux = new Object();
			aux.label = formatarData(atual.getDate(), atual.getMonth()+1, atual.getFullYear());
			aux.y = simulacao.Saldo;
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
setInterval(atualizarPontosSaldo, 10000)
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
		axisX: {title: "Dias"},
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
}, 200)
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
			contas[i].DiaPerdaGanho = novo;
			total += contas[i].Valor;
			$.ajax({
				url: 'http://' + local + ':3000/contas/' + contas[i].CodPatrimonio,
				type: 'patch',
				data: contas[i]
			})
		}
	}
	return total;
}