var username;
var rank;

function acessarDados() 
{
	username = "Vinschers";
	rank = "# " + 45;
}
function colocarDados() {
	acessarDados();
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
	setTimeout(function() {
		$("#footer").css("top", ($("#conteudo").height() - 500) + "px");
	}, 10);
}