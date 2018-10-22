function verificarCampos()
{
	var nome = document.getElementsByName('nome')[0];
	var email = document.getElementsByName('email')[0];
	var radiosSexo = document.getElementsByName('sexo');
	var username = document.getElementsByName('username')[0];
	var senha1 = document.getElementsByName('senha')[0];
	var senha2 = document.getElementsByName('confSenha')[0];

	var houveErro = false;

	if (!testarTamanho(nome, 3, "Nome", "Mínimo de 3 caracteres"))
		houveErro = true;
	if (!testarFormato(email,
				 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				 "Email",
				 "Formato Inválido"))
		houveErro = true;
	if (!testarRadioSelecionado(radiosSexo, "Sexo", "Selecione uma opção"))
		houveErro = true;
	if (!testarTamanho(username, 7, "Username", "Mínimo de 7 caracteres"))
		houveErro = true;
	if (!testarTamanho(senha1, 7, "Senha", "Mínimo de 7 caracteres"))
		houveErro = true;
	if (!testarIgualdade(senha2, senha1, "Confirmar senha", "Senhas diferentes"))
		houveErro = true;

	if (!houveErro)
	{
		document.getElementById("corrija").textContent = "";
		$.get('http://localhost:3000/getUsuario/' + username.value, function(resposta) {
			if (resposta.length == 0)
			{
				var usuario = new Object();
				usuario.Username = username.value;
				usuario.Senha = senha1.value;
				usuario.Nome = nome.value;
				usuario.Sexo = radiosSexo[0].checked?radiosSexo[0].value:radiosSexo[1].value;
				usuario.Biografia = '';
				usuario.Email = email.value;
				usuario.FotoPerfil = 00000;
				usuario.ImagemBanner = 0000;
				usuario.CorBanner = '';
				usuario.CorFundo = '';
				console.log(usuario)
				$.post('http://localhost:3000/usuario', usuario)
				abrir("html/home.html");
				alert("Registro efetuado. Faça login para continuar!");
			}
			else
				alert("Nome de usuário já tomado!");
		});
	}
	else
		document.getElementById("corrija").textContent = "Corrija os itens em vermelho para continuar";
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

function abrirIntroducao()
{
	window.open("html/informacoes.html", "_self");
}