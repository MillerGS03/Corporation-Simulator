criarSlideShowGenerico('ranking');
var usuariosRanking;
function colocarRanking()
{
    var atual = new Array();
    $.get('http://' + local + ':3000/getRanking').done(function(dados){
        var i,j,chunk = 20;
        var div;
        usuariosRanking = dados;
        for (var qtd = 0,i=0,j=dados.length; i<j; i+=chunk, qtd++) {
            atual = dados.slice(i,i+chunk);
            var ol = document.createElement("ol");
            if (qtd % 2 == 0)
            {
                div = document.createElement("div")
                ol.id = "rankingEsquerda";
                colocarNoRanking(atual, ol, qtd);
                div.appendChild(ol)
            }
            else
            {
                ol.id = "rankingDireita"
                colocarNoRanking(atual, ol, qtd);
                div.appendChild(ol)
                criarSlideGenerico(div)
            }
            if (i + chunk >= j)
            {
                div = document.createElement("div")
                ol = document.createElement("ol");
                ol.id = "rankingEsquerda";
                div.appendChild(ol)
                colocarNoRanking(dados.slice(i,j), ol, qtd);
                criarSlideGenerico(div)
            }
            mostrarSlide(slideIndex)
        }
    })
}
function colocarNoRanking(array, ol, qtd)
{
    $.each(array, function(i, v){
        var str = "<li>";
        str += (i+(qtd*20)+1) + "° - ";
        str += v.Username;
        str += " (";
        str += v.SomaXP;
        str += ")";
        str += "</li>";
        ol.innerHTML += str;
    })
}
colocarRanking();
$("#search").on('click', function(){
    var achou = false;
    $("li").attr('style', '')
    var lis = $("li");
    var u = $("#txtPesquisa").val();
    for (var i = 0; i < usuariosRanking.length; i++)
        if (usuariosRanking[i].Username.toUpperCase().includes(u.toUpperCase()))
        {
            var pag = Math.floor(i/40)+1;
            mudarSlide(pag);
            selecionarElemento(lis[i+4])
            achou = true;
        }
    if (!achou)
        alert('Usuário não encontrado.')
})
$("#txtPesquisa").on('keypress', function(e){
    if (e.which == 13)
    {
        $('#search').trigger('click')
        return false;
    }
})
function selecionarElemento(e)
{
    $(e).css('border', '0.1vh solid black')
    $(e).css('background', '#cceeff')
}