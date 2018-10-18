var arquivoAberto = "";
var fatorTamanho = 1;

function testarAncora()
{
	fatorTamanho = window.innerWidth / 1600;
	$("#fundoJogo").css("background-size", window.innerWidth * 1.2 / 1.77 > 700?"120vw":"1366px");
	if (arquivoAberto != "html/home.html")
		switch (arquivoAberto)
		{
			case "html/funcionalidades.html":
				break;
			case "html/"
		}
	else
		$("#conteudo").css("transform", "");
}
function abrir(arq) {
	$("#conteudo").empty();
	$('#conteudo').load(arq);
	arquivoAberto = arq;
	testarAncora();
}