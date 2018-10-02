var arquivo;

$("#foto").on("mouseenter", function() {
	$("#mudarImagem").css("visibility", "visible");
	$("#mudarImagem").css("top", "200px");
});
$("#foto").on("mouseleave", function() {
	$("#mudarImagem").css("visibility", "hidden");
});
$("#newImage").on("change", function () {
	arquivo = document.getElementById("newImage").files[0];
	var r = new FileReader();
	r.onload = function (e) {
		$("#foto").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 300px 300px;') 
	};
	r.readAsDataURL(arquivo);
});
$("#exibir1").on("mousedown", function (){
	mostrarSenha("senhaAntiga");
});
$("#exibir2").on("mousedown", function (){
	mostrarSenha("senhaNova");
});
$("#exibir3").on("mousedown", function (){
	mostrarSenha('confSenha');
});
$("#exibir1").on("mouseup", function (){
	mostrarSenha("senhaAntiga");
});
$("#exibir2").on("mouseup", function (){
	mostrarSenha("senhaNova");
});
$("#exibir3").on("mouseup", function (){
	mostrarSenha('confSenha');
});

function mostrarSenha(id)
{
	var x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function update()
{
	var ler = new FileReader();
	ler.onload = function(e){ 
		var uploadImagem = e.target.result;
		//colocar uploadImagem no banco de dados
	};
	ler.readAsBinaryString(arquivo);
}

function Atualizar()
{
	var username = document.getElementsByName("username")[0].innerHTML;
	var nome = document.getElementsByName("nome")[0].innerHTML;
	var email = document.getElementsByName("email")[0].innerHTML;
	var sexo = document.getElementsByName("sexo")[0].innerHTML[0];
	var senha = document.getElementsByName("senhaNova")[0].innerHTML;
	alert(username + nome + email + sexo + senha);
	//inserir no banco de dados
}
function verificarCampos()
{
	var houveErro = false;
	if (!testarTamanho(document.getElementsByName('nome')[0], 3, "Nome", "Mínimo de 3 caracteres"))
		houveErro = true;
	if (!testarFormato(document.getElementsByName('email')[0],
				 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				 "Email",
				 "Formato Inválido"))
		houveErro = true;
	if (!testarRadioSelecionado(document.getElementsByName('sexo'), "Sexo", "Selecione uma opção"))
		houveErro = true;
	if (!testarTamanho(document.getElementsByName('username')[0], 7, "Username", "Mínimo de 7 caracteres"))
		houveErro = true;
	if (!testarTamanho(document.getElementsByName('senha')[0], 7, "Senha", "Mínimo de 7 caracteres"))
		houveErro = true;
	if (!testarIgualdade(document.getElementsByName('confSenha')[0], document.getElementsByName('senha')[0], "Confirmar senha", "Senhas diferentes"))
		houveErro = true;
	if (!houveErro)
	{
		document.getElementById("corrija").textContent = "";
		Atualizar();
	}
	else
	{
		document.getElementById("corrija").textContent = "Corrija os itens em vermelho para continuar";
	}
}
function testarFormato(campo, formato, titulo, mensagemErro)
{
	var sucesso = true;
	if (!formato.test(campo.value))
	{
		campo.parentElement.style.color = "darkred";
		campo.parentElement.firstElementChild.textContent = titulo + " - " + mensagemErro;
		sucesso = false;
	}
	else
	{
		campo.parentElement.style.color = "black";
		campo.parentElement.firstElementChild.textContent = titulo;
	}
	return sucesso;
}
function testarTamanho(campo, tamanho, titulo, mensagemErro)
{
	var sucesso = true;
	if (campo.value.length < tamanho) 
	{
		campo.parentElement.style.color = "darkred";
		campo.parentElement.firstElementChild.textContent = titulo + " - " + mensagemErro;
		sucesso = false;
	}
	else
	{
		campo.parentElement.style.color = "black";
		campo.parentElement.firstElementChild.textContent = titulo;
	}
	return sucesso;
}
function testarRadioSelecionado(botoes, titulo, mensagemErro)
{
	var nadaSelecionado = true;
	for (var i = 0; i < botoes.length; i++)
		if (botoes[i].checked)
			nadaSelecionado = false;
	if (nadaSelecionado)
	{
		botoes[0].parentElement.firstElementChild.style.color = "darkred";
		botoes[0].parentElement.firstElementChild.textContent = titulo + " - " + mensagemErro;
	}
	else
	{
		botoes[0].parentElement.firstElementChild.style.color = "black";
		botoes[0].parentElement.firstElementChild.textContent = titulo;
	}
	return !nadaSelecionado;
}
function testarIgualdade(campoConfirme, campoRelativo, titulo, mensagemErro)
{
	var igual = campoConfirme.value == campoRelativo.value;
	if (!igual)
	{
		campoConfirme.parentElement.style.color = "darkred";
		campoConfirme.parentElement.firstElementChild.textContent = titulo + " - " + mensagemErro;
	}
	else
	{
		campoConfirme.parentElement.style.color = "black";
		campoConfirme.parentElement.firstElementChild.textContent = titulo;
	}
	return igual;
}