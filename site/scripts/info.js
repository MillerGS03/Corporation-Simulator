var username;
var rank;
var conteudoAberto = null;

function acessarDados() 
{
	username = "Vinschers";
	rank = "# " + 45;
}
function colocarDados() {
	acessarDados();
	$("#user").text(username);
	$("#rank").text(rank);
	$("#conteudoInfo").css("height", "900");
}
function abrirInfo(arq) 
{
	if (conteudoAberto == "jogo.html")
		finalizarJogo();
	$("#conteudoInfo").empty();
	$('#conteudoInfo').load("html/" + arq);
	conteudoAberto = arq;
}