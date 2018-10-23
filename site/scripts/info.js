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
	$("#configuracoes").removeClass('active');
	$("#classificacao").removeClass('active');
	$("#manual").removeClass('active');
	$("#simulacoes").removeClass('active');
	$("#jogos").removeClass('active');

	if (arq.includes("configurar"))
		$("#configuracoes").addClass('active');
	else if (arq.includes("classificacao"))
		$("#classificacao").addClass('active');
	else if (arq.includes("manual"))
		$("#manual").addClass('active');
	else if (arq.includes("simulac"))
		$("#simulacoes").addClass('active');
	else
		$("#jogos").addClass('active');
}
abrirInfo('configurar.html');