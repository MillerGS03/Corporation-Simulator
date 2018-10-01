var arquivo;
$("#foto").on("mouseenter", function() {
	$("#mudarImagem").css("visibility", "visible");
	$("#mudarImagem").css("top", "200px");
});
$("#foto").on("mouseleave", function() {
	$("#mudarImagem").css("visibility", "hidden");
});
$("#newImage").on("change", function () {
	arquivo = document.getElementById("newImage").files[0];
	var r = new FileReader();
	r.onload = function (e) {
		$("#foto").attr('style', 'background: url('+e.target.result+') no-repeat;background-size: 300px 300px;') 
	};
	r.readAsDataURL(arquivo);
});
function update()
{
	var ler = new FileReader();
	ler.onload = function(e){ 
		var uploadImagem = e.target.result;
		//colocar uploadImagem no banco de dados
	};
	ler.readAsBinaryString(arquivo);
}