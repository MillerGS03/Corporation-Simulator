function testarAncora()
{
	if (window.innerWidth >= 3000)
	{
		$('#login').css("left", "1850px")
		$('#listaNavegacao').css("left", "2220px");
	}
	else if (window.innerWidth >= 1000)
	{
		$('#login').css("left", 600 + (window.innerWidth - 1000) / 2 + "px");
		$('#listaNavegacao').css("left", 470 + (window.innerWidth - 1000) + "px");
	}
	else
	{
		$('#login').css("left", "600px");
		$('#listaNavegacao').css("left", "470px");
	}
}

function abrir(arq) {
	$("#conteudo").empty();
	$('#conteudo').load(arq);

	setTimeout(testarAncora, 10);
}