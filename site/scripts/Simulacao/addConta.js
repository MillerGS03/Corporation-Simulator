var erro;
var domingo = true;
var segunda = true;
var terca = true;
var quarta = true;
var quinta = true;
var sexta = true;
var sabado = true;
for (var i = 0; i < 7; i++)
	mudarDia(document.getElementsByTagName('img')[i].id)
$("img").on('click', function(){mudarDia(this.id)})
$("#painelConta").css('height', '70vh')
$("#sairModal").on('click', function(){
	$("#modal").css('display', 'none');
})
$('#addClass').on('click', function(){
	$('#txtClass').css('display', 'block');
	$('#btnClass').css('display', 'block');
});
$('#btnClass').on('click', function(){
	var classif = $('#txtClass').val();
	var s = document.getElementById("classificacoes");
	$.post('http://' + local + ':3000/addClassificacao/' + simulacao.CodSimulacao + '/' + classif)
	setTimeout(function(){
		$('#txtClass').text('');
		$('#txtClass').css('display', 'none');
		$('#btnClass').css('display', 'none');
		addOptions();
		setTimeout(function(){
			for (var i = 0; i <= classificacoes.length; i++)
				if (s.options[i].text == classif)
					s.options[i].selected = 'selected';
		}, 20)
	}, 10)
	$.ajax({
		url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
	}).done(function(dados) {classificacoes = dados});
});
$('#removeClass').on('click', function(){
	var cod = simulacao.CodSimulacao;
	var classif = $("#classificacoes option:selected").val();
	$.ajax({
		url: 'http://' + local + ':3000/classificacoes/' + cod + '/' + classif,
		type: 'DELETE'
	}).done(addOptions());
});
tiposIntervalo = setInterval(function(){
	if (document.getElementById('var').checked)
	{
		document.getElementById('intervaloTempo').style.display = 'none';
		document.getElementById('freq').style.display = 'block';
	}
	else if (document.getElementById('abs').checked)
	{
		document.getElementById('freq').style.display = 'none';
		document.getElementById('intervaloTempo').style.display = 'block';
	}
}, 1)
addOptions();

function addOptions()
{
	$.ajax({
		url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
	}).done(function(dados){
		classificacoes = dados;
		var s = document.getElementById("classificacoes");
		var primeiraOpcao = s.options[0];
		$("#classificacoes").empty();
		s.add(primeiraOpcao);
		for (var i = 0; i < classificacoes.length; i++)
		{
			var o = document.createElement("option");
			o.text = classificacoes[i].Nome;
			s.add(o);
		}
	});
}

$("#adicionarConta").on('click', function() {
	validarFormulario();
});

function validarFormulario()
{
	erro = false;
	testarNome();
	testarTipo();
	testarValor();
	testarTempo();
	testarClassificacao();
	testarIntervalo();
	testarSemana();
	if (erro)
	{
		var alt = getLineHeight(document.getElementById('class'))
		document.getElementById('addClass').style.top = '8vh';
		document.getElementById('removeClass').style.top = '8vh';
		return false;
	}
	else
		adicionar();
}

function adicionar()
{
	var conta = new Object();
	conta.Nome = document.getElementById('nomeConta').value;
	for (var i = 0; i < contas.length; i++)
		if (contas[i].Nome.toUpperCase() == conta.Nome.toUpperCase())
		{
			alerta('Você já tem uma conta com esse nome!')
			return;
		}
	var valor = document.getElementById('valorConta').value;
	if (document.getElementById('perda').checked)
		valor = -valor;
	conta.Valor = valor;
	if (document.getElementById('abs').checked)
	{
		var intervalo;												//em segundos
		var tipoTempo = $("#tTempo option:selected").text();
		var hoje = new Date();
		if (tipoTempo == 'Dia(s)')
		{
			hoje.setDate(hoje.getDate() + parseInt($("#nTempo").val()));
			intervalo = $("#nTempo").val() + 'D';
		}
		else if (tipoTempo == 'Mes(es)')
		{
			hoje.setMonth(hoje.getMonth() + parseInt($("#nTempo").val()));
			intervalo = $("#nTempo").val() + 'M';
		}
		else
		{
			hoje.setFullYear(hoje.getFullYear() + parseInt($("#nTempo").val()));
			intervalo = $("#nTempo").val() + 'A';
		}
		conta.Intervalo = intervalo;
		conta.DiaPerdaGanho = hoje;
	}
	else
	{
		conta.Marcado = 2;
		var hoje = new Date();
		var diasTotais = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
		var dias = new Array();
		for (var i = 0; i < 7; i++)
		{
			var diaAtual = eval(diasTotais[i]);
			if (diaAtual)
				dias.push(diasTotais[i])
		}
		var diffs = [];
		var hojeAux = new Date();
		for (var j = 0; j < dias.length; j++)
		{
			var diff = (diasTotais.indexOf(dias[j])+(7-hojeAux.getDay())) % 7;
			diffs.push(diff);
		}
		var dataMaisProxima = 10;
		for (var j = 0; j < diffs.length; j++)
		{
			if (diffs[j] < dataMaisProxima)
				dataMaisProxima = diffs[j];
		}
		hojeAux.setDate(hojeAux.getDate() + dataMaisProxima);
		var auxData = hojeAux.toUTCString();
		hojeAux = new Date(auxData)
		hojeAux.setHours(0, 0, 0)
		conta.DiaPerdaGanho = hojeAux;
		var str = '';
		for (var x = 0; x < dias.length; x++)
			str += dias[x] + ','
		str = str.substring(0, str.length-1);
		conta.Intervalo = str;
	}
	var classificacao = $("#classificacoes option:selected").text();
	var cod;
	for (var i = 0; i < classificacoes.length; i++)
	{
		if (classificacoes[i].Nome == classificacao)
		{
			cod = classificacoes[i].CodClassificacao;
			break;
		}
	}
	conta.Classificacao = cod;
	$.post('http://' + local + ':3000/addConta/' + simulacao.CodSimulacao, conta);
	$.ajax({
		url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
	}).done(function(dados){contas = dados;})
	$("#sairModal").trigger('click');
	atualizarPontosConta();
	atualizarPontosClass();
}

function testarNome()
{
	var nome = document.getElementById('nomeConta');
	if (nome.value.length <= 3){
		nome.parentElement.style.color = "darkred";
		nome.parentElement.firstElementChild.innerHTML = "Nome da Conta</span><br><span>Mínimo de 4 caracteres:";
		erro = true;
	}
	for (var i = 0; i < contas.length; i++)
		if (contas[i].Nome == nome)
		{
			erro = true;
			t.parentElement.style.color = "darkred";
			nome.parentElement.firstElementChild.innerHTML = "Nome da Conta</span><br><span>Nome já existe:";
		}
}
function testarTipo()
{
	var tipo = document.getElementById('ganho');
	if (!(tipo.checked || document.getElementById('perda').checked)){
		var t = document.getElementById('tipoConta');
		t.style.color = "darkred";
		t.innerHTML = "Tipo</span><br><span>Selecione um tipo:";
		erro = true;
	}
}
function testarValor()
{
	var val = $('#valorConta').val();
	var v = document.getElementById('valorConta');
	if (isNaN(val) || val <= 0){
		console.log(val)
		v.parentElement.style.color = "darkred";
		v.parentElement.firstElementChild.innerHTML = "Valor</span><br><span>Insira um número positivo válido:";
		erro = true;
	}
}
function testarTempo()
{
	if (document.getElementById('abs').checked)
	{
		var tempo = parseInt($('#nTempo').val());
		var t = document.getElementById('nTempo');
		if (isNaN(tempo) || tempo <= 0){
			t.parentElement.style.color = "darkred";
			t.parentElement.firstElementChild.innerHTML = "Intervalo de Tempo</span><br><span>Insira um número positivo válido:";
			erro = true;
		}
		if ($("#tTempo").val() == 'D' && tempo > 31)
		{
			erro = true;
			t.parentElement.style.color = "darkred";
			t.parentElement.firstElementChild.innerHTML = "Intervalo de Tempo</span><br><span>Insira um número positivo válido:";
		}
		if ($("#tTempo").val() == 'M' && tempo > 12)
		{
			erro = true;
			t.parentElement.style.color = "darkred";
			t.parentElement.firstElementChild.innerHTML = "Intervalo de Tempo</span><br><span>Insira um número positivo válido:";
		}
		if ($("#tTempo").val() == 'M' && tempo > 100)
		{
			erro = true;
			t.parentElement.style.color = "darkred";
			t.parentElement.firstElementChild.innerHTML = "Intervalo de Tempo</span><br><span>Insira um número positivo válido:";
		}
	}
}
function testarIntervalo()
{
	if (!document.getElementById('abs').checked)
		if(!document.getElementById('var').checked)
		{
			erro = true;
			var t = document.getElementById('tIntervalo');
			t.style.color = "darkred";
			t.innerHTML = 'Tipo do intervalo de tempo</span><br><span>selecione uma opção';
		}
}
function testarClassificacao()
{
	var c = document.getElementById('classificacoes');
	if (c.selectedIndex <= 0){
		c.parentElement.style.color = "darkred";
		c.parentElement.firstElementChild.innerHTML = "Classificação</span><br><span>Selecione pelo menos uma classificação:";
		erro = true;
	}
}
function testarSemana()
{
	if (document.getElementById('var').checked)
	{
		var dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
		for (var i = 0; i < 7; i++)
		{
			var diaAtual = eval(dias[i]);
			if (diaAtual)
				return true;
		}
		return false;
	}
}

function mudarDia(dia)
{
	dia = dia.substring(0,dia.length - 1)
	eval(dia + "=!" + dia)
	var diaAtual = eval(dia);
	if (diaAtual)
		$("#" + dia + "T").removeClass('hidden');
	else
		$("#" + dia + "T").toggleClass('hidden');
}
function getLineHeight(element){
	var temp = document.createElement(element.nodeName);
	temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
	temp.innerHTML = "test";
	temp = element.parentNode.appendChild(temp);
	var ret = temp.clientHeight;
	temp.parentNode.removeChild(temp);
	return ret;
 }