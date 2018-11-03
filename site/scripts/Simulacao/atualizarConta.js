$("#painelConta").css('height', '70vh')
var conta;
$("#sairModal").on('click', function() {
    $("#modal").css('display', 'none');
});
$("#s").on('change', function(){
	if (document.getElementById('s').selectedIndex > 0)
	{
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
		if (contas[i].Marcado == 0)
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
	contaA.DiaPerdaGanho = hoje.getDate() + '/' + hoje.getMonth() + '/' + hoje.getFullYear();
	contaA.Intervalo = intervalo;
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
		nome.parentElement.firstElementChild.textContent = "Nome da Conta - Mínimo de 4 caracteres:";
		erro = true;
	}
}
function testarTipo()
{
	var tipo = document.getElementById('ganho');
	if (!(tipo.checked || document.getElementById('perda').checked)){
		tipo.parentElement.style.color = "darkred";
		tipo.parentElement.firstElementChild.textContent = "Tipo - Selecione um tipo:";
		erro = true;
	}
}
function testarValor()
{
	var val = parseInt($('#valorConta').val());
	var v = document.getElementById('valorConta');
	if (isNaN(val) || val <= 0){
		v.parentElement.style.color = "darkred";
		v.parentElement.firstElementChild.textContent = "Valor - Insira um número positivo válido:";
		erro = true;
	}
}
function testarTempo()
{
	var tempo = parseInt($('#nTempo').val());
	var t = document.getElementById('nTempo');
	if (isNaN(tempo) || tempo <= 0){
		t.parentElement.style.color = "darkred";
		t.parentElement.firstElementChild.textContent = "Intervalo de Tempo - Insira um número positivo válido:";
		erro = true;
	}
}
function testarClassificacao()
{
	var c = document.getElementById('classificacoes');
	if (c.selectedIndex <= 0){
		c.parentElement.style.color = "darkred";
		c.parentElement.firstElementChild.textContent = "Classificação - Selecione pelo menos uma classificação:";
		erro = true;
	}
}