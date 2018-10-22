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
	$("#configuracoes").addClass('opcao');
	$("#classificacao").addClass('opcao');
	$("#manual").addClass('opcao');
	$("#simulacoes").addClass('opcao');
	$("#jogos").addClass('opcao');
	switch(arq)
	{
		case 'configurar.html':
			$("#configuracoes").addClass('active');
			$("#configuracoes").removeClass('opcao');
		break;
		case 'classificacao.html':
			$("#classificacao").addClass('active');
			$("#classificacao").removeClass('opcao');
		break;
		case 'manual1.html':
			$("#manual").addClass('active');
			$("#manual").removeClass('opcao');
		break;
		case 'simulacoes.html':
			$("#simulacoes").addClass('active');
			$("#simulacoes").removeClass('opcao');
		break;
		case 'simulacao.html':
			$("#simulacoes").addClass('active');
			$("#simulacoes").removeClass('opcao');
		break;
		case 'selecionar.html':
			$("#jogos").addClass('active');
			$("#jogos").removeClass('opcao');
		break;
		case 'jogo.html':
			$("#jogos").addClass('active');
			$("#jogos").removeClass('opcao');
		break;
	}
}
abrirInfo('configurar.html');