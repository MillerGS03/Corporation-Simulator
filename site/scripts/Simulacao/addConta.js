var classificacoes;
var erro;
$("#sairModal").on('click', function(){
		$("#modal").css('display', 'none');
	})

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
	if (erro)
		return false;
	else
		adicionar();
}

function adicionar()
{
	var conta = new Object();
	conta.Nome = document.getElementById('nomeConta').value;
	var valor = document.getElementById('valorConta').value;
	if (document.getElementById('perda').checked)
		valor = -valor;
	conta.Valor = valor;
	var intervalo;												//em segundos
	var tipoTempo = $("#tTempo option:selected").text();
	if (tipoTempo == 'Dia(s)')
		intervalo = $("#nTempo").val() + 'D';
	else if (tipoTempo == 'Mes(es)')
		intervalo = $("#nTempo").val() + 'M';
	else
		intervalo = $("#nTempo").val() + 'A';
	conta.Intervalo = intervalo;
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
	$("#sairModal").trigger('click');
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