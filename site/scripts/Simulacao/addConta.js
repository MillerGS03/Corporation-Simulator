var classificacoes = new Array('saneamento', 'educacao', 'energia', 'lazer', 'combustivel', 'alimentacao', 'impostos');
var erro;
$("#sairModal").on('click', function(){
		$("#modal").css('display', 'none');
	})

addOptions();

function addOptions()
{
	var s = document.getElementById("classificacoes");
	var numeroDeClassificacoes = 3 //pegar do bd
    for (var i = 0; i < numeroDeClassificacoes; i++)
    {
        var o = document.createElement("option");
        o.text = classificacoes[i];
        s.add(o);
    }
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
	var nome = document.getElementById('nomeConta').value;
	var valor = document.getElementById('valorConta').value;
	if (document.getElementById('perda').checked)
		valor = -valor;
	var intervalo;												//em segundos
	var tipoTempo = $("#tTempo option:selected").text();
	if (tipoTempo == 'Dia(s)')
		intervalo = parseInt($("#nTempo").text()) * 86400;
	else if (tipoTempo == 'Mes(es)')
		intervalo = parseInt($("#nTempo").text()) * 2592000;
	else
		intervalo = parseInt($("#nTempo").text()) * 31536000;
	var classificacao = $("#classificacoes option:selected").text();
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
	var v = document.getElementById('valorConta');
	if (isNaN(parseInt(v.value)) || parseInt(v.value) <= 0){
		v.parentElement.style.color = "darkred";
		v.parentElement.firstElementChild.textContent = "Valor - Insira um número positivo válido:";
		erro = true;
	}
}
function testarTempo()
{
	var t = document.getElementById('nTempo');
	if (isNaN(parseInt(t.value)) || parseInt(t.value) <= 0){
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
		c.parentElement.firstElementChild.textContent = "Classificacao - Selecione pelo menos uma classificacao:";
		erro = true;
	}
}