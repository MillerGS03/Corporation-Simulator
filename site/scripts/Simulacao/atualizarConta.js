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
$("input[type=radio]").on('change', function(){
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
})
$("#painelConta").css('height', '70vh')
var conta;
$("#sairModal").on('click', function() {
    $("#modal").css('display', 'none');
});
var dias;
$("#s").on('change', function(){
	if (document.getElementById('s').selectedIndex > 0)
	{
		for (var i = 0; dias!= null && i < dias.length; i++)
		{
			dia = dias[i];
			$("#" + dia + "F").trigger('click');
		}
		var nomeConta = document.getElementById('s').options[document.getElementById('s').selectedIndex].value;
		$.ajax({
			url: 'http://' + local + ':3000/contas/' + simulacao.CodSimulacao + '/' + nomeConta
		}).done(function(dados){
			conta = dados[0];
			$('#nomeConta').val(conta.Nome);
			if (conta.Valor < 0)
				$("#perda").prop("checked", true)
			else
				$("#ganho").prop("checked", true)
			$("#valorConta").val(Math.abs(conta.Valor));
			if (conta.Marcado == 0)
			{
				document.getElementById('abs').checked = true;
				var intervalo = conta.IntervaloDeTempo.charAt(conta.IntervaloDeTempo.length - 1)
				switch (intervalo)
				{
					case 'D':
						$("#tTempo").prop('selectedIndex', 0);
					break;
		
					case 'M':
						$("#tTempo").prop('selectedIndex', 1);
					break;
		
					case 'A':
						$("#tTempo").prop('selectedIndex', 2);
					break;
				}
				$("#nTempo").val(conta.IntervaloDeTempo.substring(0, conta.IntervaloDeTempo.length - 1))
			}
			else if (conta.Marcado == 2)
			{
				document.getElementById('var').checked = true;
				dias = conta.IntervaloDeTempo.split(',')
				for (var i = 0; i < dias.length; i++)
				{
					dia = dias[i];
					$("#" + dia + "F").trigger('click');
				}
			}
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
			$.ajax({
				url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
			}).done(function(dados){
				for(var i = 0; i < dados.length; i++)
					if (conta.CodClassificacao == dados[i].CodClassificacao)
						$("#classificacoes").prop('selectedIndex', i+1);
			})
		})
	}
	else
	{
		$("input[type=text]").val('');
		$("#classificacoes").val(0);
		$("#perda").prop("checked", false)
		$("#ganho").prop("checked", false)
	}
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
	}, 100)
	$.ajax({
		url: 'http://' + local + ':3000/getClassificacoes/' + simulacao.CodSimulacao
	}).done(function(dados) {classificacoes = dados});
});
$('#removeClass').on('click', function(){
    var cod = simulacao.CodSimulacao;
    var classif = $("#classificacoes option:selected").val();
    confirma('Deseja realmente remover essa classificação?', function(){
        $.ajax({
            url: 'http://' + local + ':3000/classificacoes/' + cod + '/' + classif,
            type: 'DELETE'
        }).done(addOptionsC());
    })
});


function addOptions()
{
    var s = document.getElementById('s');
    var p = s.options[0];
    $("#s").empty();
    s.add(p)
    for (var i = 0; i < contas.length; i++)
    {
		if (contas[i].Marcado != 1)
		{
			var o = document.createElement('option');
			o.text = contas[i].Nome;
			s.add(o);
		}
    }
}
function addOptionsC()
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

addOptions();
addOptionsC();

$("#atualizarContaA").on('click', function() {
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
		return false;
	else
		atualizarConta();
}

function atualizarConta()
{
	var hoje = new Date();
	var contaA = new Object();
	contaA.Nome = document.getElementById('nomeConta').value;
	var valor = document.getElementById('valorConta').value;
	if (document.getElementById('perda').checked)
		valor = -valor;
	contaA.Valor = valor;
	if (document.getElementById('abs').checked)
	{
		var intervalo;												//em segundos
		var tipoTempo = $("#tTempo option:selected").text();
		if (tipoTempo == 'Dia(s)')
		{
			intervalo = $("#nTempo").val() + 'D';
			hoje.setDate(hoje.getDate() + parseInt($('#nTempo').val()));
		}
		else if (tipoTempo == 'Mes(es)')
		{
			intervalo = $("#nTempo").val() + 'M';
			hoje.setMonth(hoje.getMonth() + parseInt($('#nTempo').val()));
		}
		else
		{
			intervalo = $("#nTempo").val() + 'A';
			hoje.setFullYear(hoje.getFullYear() + parseInt($('#nTempo').val()));
		}
		contaA.DiaPerdaGanho = (hoje.getMonth()+1) + '/' + hoje.getDate() + '/' + hoje.getFullYear();
		contaA.Intervalo = intervalo;
	}
	else if (document.getElementById('var').checked)
	{
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
		auxData = auxData.substring(0, auxData.length-5)
		hojeAux = new Date(auxData)
		hojeAux.setHours(0, 0, 0)
		contaA.DiaPerdaGanho = (hojeAux.getMonth()+1) + '/' + hojeAux.getDate() + '/' + hojeAux.getFullYear();
		var str = '';
		for (var x = 0; x < dias.length; x++)
			str += dias[x] + ','
		str = str.substring(0, str.length-1);
		contaA.Intervalo = str;
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
	contaA.Classificacao = cod;
	$.ajax({
		url: 'http://' + local + ':3000/contas/' + conta.CodPatrimonio,
		type: 'patch',
		data: contaA
	})
	setTimeout(function(){
		$.ajax({
			url: 'http://' + local + ':3000/getContas/' + simulacao.CodSimulacao
		}).done(function(dados){
			contas = dados;
			$("#classificacoes").empty();
			$('#s').empty();
			$("#sairModal").trigger('click');
			atualizarPontosConta();
			atualizarPontosClass();
		})
	}, 100)
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