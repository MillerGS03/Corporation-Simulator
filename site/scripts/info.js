var username = "Vinschers";										//acessar banco para pegar dados
var rank = "# " + 45;
	function ColocarDados() {
		document.getElementById("user").innerHTML = username;
		document.getElementById("rank").innerHTML = rank;
	}
	function testarAncora()
	{
		document.getElementById('listaNavegacao').style.position = "relative";
		if (window.innerWidth >= 1000)
			document.getElementById('listaNavegacao').style.left = 450 + (window.innerWidth - 1000) + "px";
		else
			document.getElementById('listaNavegacao').style.left = "450px";
	}