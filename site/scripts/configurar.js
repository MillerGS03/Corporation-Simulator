var arquivoI;
var arquivoB;
var senhaAtual = user.Senha;

$("#foto").on("mouseenter", function() {
	$("#mudarImagem").css("visibility", "visible");
});
$("#foto").on("mouseleave", function() {
	$("#mudarImagem").css("visibility", "hidden");
});
$("#newImage").on("change", function () {
	arquivoI = document.getElementById("newImage").files[0];
	var r = new FileReader();
	r.onload = function (e) {
		$("#foto").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 28vh 28vh;');
		$("#perfil").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 15vw 15vw;');
	};
	r.readAsDataURL(arquivoI);
});
$("#mudarImagem").on("click", function() {
	$("#newImage").trigger("click");
});
$("#banner").on("mouseenter", function() {
	$("#mudarBanner").css("visibility", "visible");
});
$("#banner").on("mouseleave", function() {
	$("#mudarBanner").css("visibility", "hidden");
});
$("#newBanner").on("change", function () {
	arquivoB = document.getElementById("newBanner").files[0];
	var r = new FileReader();
	r.onload = function (e) {
		$("#banner").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 100% 100%;');
		$("#menu").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 100% 100%;');
	};
	r.readAsDataURL(arquivoB);
	atualizarConfigs();
});
$("#mudarBanner").on("click", function() {
	$("#newBanner").trigger("click");
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
$("#rightPage").on("click", function () {
	abrirInfo("configurar2.html");
	setTimeout(mudarCorConteudo, 5);
});
$("#leftPage").on("click", function () {
	abrirInfo("configurar.html");
	setTimeout(mudarCorMenu, 5);
	if (arquivoI != null)
	{
		var r = new FileReader();
		r.onload = function (e) {
			$("#foto").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 28vh 28vh;');
			$("#perfil").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 15vw 15vw;');
		};
		r.readAsDataURL(arquivoI);
	}
});
$("#backColor").on("change", function(){
	var cor = document.getElementById("backColor").value;
	$("#conteudoInfo").css("background-color", cor);
	$.ajax({
		url: 'http://' + local + ':3000/usuario/corFundo/' + user.CodUsuario,
		type: 'PATCH',
		data: {Cor: cor}
	});
})
$("#backColorB").on("change", function(){
	var cor = document.getElementById("backColorB").value;
	$("#menu").css("background-color", cor);
	$("#banner").css("background-color", cor);
	$.ajax({
		url: 'http://' + local + ':3000/usuario/corBanner/' + user.CodUsuario,
		type: 'PATCH',
		data: {Cor: cor}
	});
})
$("#retirarBanner").on("click", function() {
	const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  		const hex = x.toString(16)
  		return hex.length === 1 ? '0' + hex : hex
	}).join('')
	var rgb = $("#menu").css("background-color");

	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	var nada = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));

	$("#banner").attr('style', 'background-color: ' + nada + ';');
	$("#menu").attr('style', 'background-color: ' + nada + ';');
	$("#banner").attr('style', 'background: ' + nada + ';');
	$("#menu").attr('style', 'background: ' + nada + ';');
	mudarCorMenu();
});

function colocarDadosConfig()
{
	$.ajax({
		url: 'http://' + local + ':3000/usuario/' + user.CodUsuario
	}).done(function(dados){
		user = dados[0];
		$("input[name=nome]").val(user.Nome);
		$("input[name=email]").val(user.Email);
		if (user.Sexo == 'M')
			$('input[value=M]').prop('checked', true);
		else
			$('input[value=F]').prop('checked', true);
		$("#menu").css("background-color", user.CorBanner);
		$("#conteudoInfo").css("background-color", user.CorFundo);
		$("#banner").css("background-color", user.CorBanner);
		$("#foto").attr('style', 'background: url('+user.FotoPerfil+') no-repeat;background-size: 28vh 28vh;');
			$("#perfil").attr('style', 'background: url('+user.FotoPerfil+') no-repeat;background-size: 15vw 15vw;');
	})
}

function mostrarSenha(id)
{
	var x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function atualizarConfigs()
{
	var atualizar = new Object();
	atualizar.Nome = $("input[name=nome]").val();
	atualizar.Email = $("input[name=email]").val();
	if (document.getElementById('M').checked)
		atualizar.Sexo = 'M';
	else
		atualizar.Sexo = 'F';
	atualizar.Senha = $("#senhaNova").val();
	atualizar.Biografia = $('#bio').val();
	atualizar.CorBanner = $("#banner").css('background-color');
	atualizar.CorFundo = $("#conteudoInfo").css("background-color");
	$.ajax({
		url: 'http://' + local + ':3000/usuario/' + user.CodUsuario,
		type: 'PATCH',
		data: atualizar
	})
	setTimeout(function() {
		$.ajax({
			url: 'http://' + local + ':3000/getUsuario/' + user.Username
		}).done(function(dados){
			user = dados[0];
			$("#senhaAntiga").val("");
			$("#senhaNova").val("");
			$("#confSenha").val("");
		});
	}, 30);

}
function AtualizarioBio()
{
	$.ajax({
		url: 'http://' + local + ':3000/usuario/' + user.CodUsuario + '/' + $('#bio').val(),
		type: patch
	})
	setTimeout(function() {
		$.ajax({
			url: 'http://' + local + ':3000/getUsuario' + user.Username
		}).done(function(dados){user = dados[0]; console.log(user)});
	}, 30);
}
function verificarCampos()
{
	var houveErro = false;
	if (!testarTamanho(document.getElementsByName('nome')[0], 3, "Nome", "Mínimo de 3 caracteres"))
		houveErro = true;
	if (!testarFormato(document.getElementsByName('email')[0],
				 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				 "E-mail",
				 "Formato Inválido"))
		houveErro = true;
	if ($("#senhaAntiga").val().trim() != "" && testarSenhaAntiga(document.getElementById('senhaAntiga'), "Senha Atual", "Senha incorreta"))
		houveErro = true;
	if (!testarRadioSelecionado(document.getElementsByName('sexo'), "Sexo", "Selecione uma opção"))
		houveErro = true;
	if ($("input[name=senha]").val().trim() != "" && !testarTamanho(document.getElementsByName('senha')[0], 7, "Nova Senha:", "Mínimo de 7 caracteres"))
		houveErro = true;
	if ($("input[name=confSenha]").val().trim() != "" && !testarIgualdade(document.getElementsByName('confSenha')[0], document.getElementsByName('senha')[0], "Confirmar senha", "Senhas diferentes"))
		houveErro = true;
	if (!houveErro)
	{
		document.getElementById("corrija").textContent = "";
		atualizarConfigs();
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
		campo.parentElement.firstElementChild.textContent = titulo + ":";
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
		campo.parentElement.firstElementChild.textContent = titulo + ":";
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
		botoes[0].parentElement.firstElementChild.textContent = titulo + ":";
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
		campoConfirme.parentElement.firstElementChild.textContent = titulo + ":";
	}
	return igual;
}
function testarSenhaAntiga(campo, titulo, msgErro)
{
	var senhaCerta = false;
	var senha = $("#senhaAntiga").val();
	var hash = user.Senha;
	$.post('http://' + local + ':3000/autenticar/', {SenhaDigitada: senha, Hash: hash}, function(res) {
		if (!res)
		{
			campo.parentElement.style.color = "darkred";
			campo.parentElement.firstElementChild.textContent = titulo + " - " + msgErro;
		}
		return !res;
	});
}

function mudarCorConteudo()
{
	const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  		const hex = x.toString(16)
  		return hex.length === 1 ? '0' + hex : hex
	}).join('')
	var rgb = $("#conteudoInfo").css("background-color");

	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	var cor = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
	$("#backColor").attr("value", "" + cor);
}
function mudarCorMenu()
{
	const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  		const hex = x.toString(16)
  		return hex.length === 1 ? '0' + hex : hex
	}).join('')
	var rgb = $("#menu").css("background-color");
	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	var cor = rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
	$("#backColorB").attr("value", "" + cor);
	$("#banner").css('background-color', cor);
}
function carregarFoto()
{
	$("#foto").css('background', user.FotoPerfil);
}
function carregarBanner()
{
	var img = $('#menu').css('background');
	$("#banner").attr('style', 'background: '+img+';background-size: 100% 100%;');
}
setTimeout(mudarCorMenu, 5);
setTimeout(mudarCorMenu, 100);
carregarFoto();
carregarBanner();
colocarDadosConfig();