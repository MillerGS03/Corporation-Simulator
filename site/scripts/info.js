var username;
var rank;
function AcessarDados() 
{
	username = "Vinschers";
	rank = "# " + 45;
}
function ColocarDados() {
	AcessarDados();
	$("#user").text(username);
	$("#rank").text(rank);
	$("#conteudo").css("height", "900");
}
function testarAncora()
{
	$('#listaNavegacao').css("position", "relative");
	if (window.innerWidth >= 3000)
	{
		$('#listaNavegacao').css("left", "2220px")
		$('#conteudo').css("width", "2577px");
	}
	else if (window.innerWidth >= 1000)
	{
		$('#listaNavegacao').css("left", 470 + (window.innerWidth - 1000) + "px");
		$('#conteudo').css("width", window.innerWidth - 423 + "px");
	}
	else
	{
		$('#listaNavegacao').css("left", "470px");
		$('#conteudo').css("width", "577px");
	}
}
function abrir(arq) {
	$("#conteudo").empty();
	$('#conteudo').load(arq);
	comecar();
}

function comecar() 
{
	setTimeout(aux, 105);
	var batata = 2;
}

function aux()
{
	iniciarMenu();
	$("#conteudo").css("height", 1000 + "px");
}
$(document).ready(function() {
	$(window).scroll(function () {
		//if ($("#conteudo").height() > 900) {
			//$("#footer").css("top", $("#conteudo").height() + "px");
		    console.log($(window).scrollTop())
		    if ($(window).scrollTop() > 90) {
		      	$('#menu').addClass('menuOpcoes-fixed');
		    }
		    if ($(window).scrollTop() < 91) {
		      	$('#menu').removeClass('menuOpcoes-fixed');
		    }
		//}
	});
});