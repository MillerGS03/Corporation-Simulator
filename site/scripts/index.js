const local = 'localhost';
var arquivoAberto = "";
var fatorTamanho = 1;
var user;

function testarAncora()
{
	$("#fundoJogo").css("background-size", window.innerWidth * 1.2 / 1.77 > 700?"120vw":"1366px");
}
function abrir(arq) {
	if (user && arq == "html/home.html")
		arq = "html/informacoes.html";
	$("#conteudo").empty();
	$('#conteudo').load(arq);
	document.cookie = `PaginaIndex=${arq}`;
	arquivoAberto = arq;
	testarAncora();
}
function redirecionarUsuario()
{
	if (getCookie("CodUsuario") != "")
		$.get('http://' + local + ':3000/usuario/' + getCookie("CodUsuario"), function(resposta) {
            user = resposta[0];
            if (getCookie("PaginaIndex") != "")
                abrir(getCookie("PaginaIndex"));
            else
                abrir("html/home.html");
            $("#logout").css("visibility", "visible");
		});
	else
		abrir("html/home.html");
}
function logout()
{
    setCookie("CodUsuario", "");
    document.cookie = "PaginaIndex=" + "html/home.html";
    $("#logout").css("visibility", "hidden");
    user = null;
    redirecionarUsuario();
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}