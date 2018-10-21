var username;
var conteudoAberto = null;
var user;
var jogo;

function acessarDados() 
{
	username = "Scherer";
	$.ajax({
		url: 'http://localhost:3000/getUsuario/' + username
	}).done(function(dados){
		user = dados[0];
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