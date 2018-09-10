function testarAncora()
{
	if (window.innerWidth >= 2500)
	{
		document.getElementById('login').style.left = "1350px";
		document.getElementById('listaNavegacao').style.left = "1950px";
	}
	else if (window.innerWidth >= 1000)
	{
		document.getElementById('login').style.left = 600 + (window.innerWidth - 1000) / 2 + "px";
		document.getElementById('listaNavegacao').style.left = 450 + (window.innerWidth - 1000) + "px";
	}
	else
	{
		document.getElementById('login').style.left = "600px";
		document.getElementById('listaNavegacao').style.left = "450px";
	}
}