var username;
var conteudoAberto = null;
var jogo;

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
abrirInfo('configurar.html');