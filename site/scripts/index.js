function testarAncora()
{
	if (window.innerWidth >= 3000)
	{
		document.getElementById('login').style.left = "1850px";
		document.getElementById('listaNavegacao').style.left = "2220px";
	}
	else if (window.innerWidth >= 1000)
	{
		document.getElementById('login').style.left = 600 + (window.innerWidth - 1000) / 2 + "px";
		document.getElementById('listaNavegacao').style.left = 470 + (window.innerWidth - 1000) + "px";
	}
	else
	{
		document.getElementById('login').style.left = "600px";
		document.getElementById('listaNavegacao').style.left = "470px";
	}
}