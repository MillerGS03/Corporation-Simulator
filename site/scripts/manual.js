var atual = parseInt($("div:last").attr("id"));

$("#avancar").on("click", function(){
	$("#conteudo").empty();
	$("#conteudo").load("../html/manual" + (atual+1) + ".html");
});
$("#retroceder").on("click", function(){
	$("#conteudo").empty();
	$("#conteudo").load("../html/manual" + (atual-1) + ".html");
});
$("#avancar").on("mouseenter", function(){
	$(this).css("cursor", "pointer");
});
$("#retroceder").on("mouseenter", function(){
	$(this).css("cursor", "pointer");
});