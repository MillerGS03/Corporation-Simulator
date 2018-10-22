var arquivoAberto = "";
var fatorTamanho = 1;
var user;

function testarAncora()
{
	$("#fundoJogo").css("background-size", window.innerWidth * 1.2 / 1.77 > 700?"120vw":"1366px");
}
function abrir(arq) {
	$("#conteudo").empty();
	$('#conteudo').load(arq);
	arquivoAberto = arq;
	testarAncora();
}