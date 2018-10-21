var username;
var rank;
var conteudoAberto = null;
var cod;

function acessarDados() 
{
	username = "Scherer";
	rank = "# " + 45;
	$.ajax({
		url: 'http://localhost:3000/getCodUsuario/' + username
	}).done(function(dados){
		cod = dados[0].CodUsuario;
	})
}
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
setTimeout(acessarDados, 10);
abrirInfo('configurar.html');