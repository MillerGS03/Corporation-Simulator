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
	$("#conteudo").css("height", "900");
}
function abrir(arq) 
{
	if (conteudoAberto == "jogo.html")
		finalizarJogo();
	$("#conteudo").empty();
	$('#conteudo').load(arq);
	conteudoAberto = arq;
}