var slideIndex = 1;
var qtosSlides = 0;
var generico = false;
function avancarSlide(n) {
        mostrarSlide(slideIndex += n);
}

function mudarSlide(n) {
    if (n > 0 && n <= qtosSlides)
        mostrarSlide(slideIndex = n);
}

function mostrarSlide(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    if (!generico)
        var dots = document.getElementsByClassName("btn");
    else
    {
        var dots = document.getElementsByClassName("btnG");
    }
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeSlideShow", "");
    }
    if (slides[slideIndex-1] && dots[slideIndex-1])
    {
        slides[slideIndex-1].style.display = "block"; 
        dots[slideIndex-1].className += " activeSlideShow";
    }
    setTimeout(function(){
        if (chartClass && chartConta && chartSaldo)
        {
            chartConta.render();
            chartSaldo.render();
            chartClass.render();
        }
    }, 5)
}
function criarSlideShow()
{
    document.getElementById("conteudo").innerHTML += '<div id="conteinerSlides"></div>';
    document.getElementById("conteudo").innerHTML += '<div class="botao" id="esquerda" onclick="avancarSlide(-1)"><div></div></div>';
    document.getElementById("conteudo").innerHTML += '<div class="botao" id="direita" onclick="avancarSlide(1)"><div></div></div>';
    document.getElementById("conteudo").innerHTML += '<div style="text-align:center" id="botoes"></div>';
}
function criarSlideShowGenerico()
{
    generico = true;
    document.getElementById("conteudo").innerHTML += '<div id="conteinerSlidesGenerico"></div>';
    document.getElementById("conteudo").innerHTML += '<div class="botaoG" id="esquerdaG" onclick="avancarSlide(-1)"><div></div></div>';
    document.getElementById("conteudo").innerHTML += '<div class="botaoG" id="direitaG" onclick="avancarSlide(1)"><div></div></div>';
    document.getElementById("conteudo").innerHTML += '<div style="text-align:center" id="botoes"></div>';
}
function criarSlideGenerico(slide)
{
    $("#conteudo").attr('class', '')
    slide.classList.add("slides");
    slide.classList.add("fade");
    

    document.getElementById("conteinerSlidesGenerico").appendChild(slide);

    qtosSlides++;

    var botoes = document.getElementById("botoes");
    botoes.innerHTML = "";

    for (var i = 0; i < qtosSlides; i++)
    {
        var ponto = document.createElement("span");
        ponto.className = "btnG";
        ponto.id = (i + 1).toString();
        ponto.addEventListener("click", function() {mudarSlide(parseInt(this.id))});
        if (qtosSlides % 2 != 0)
            ponto.style.left = (468 + 25 * (i - Math.floor(qtosSlides / 2))) * 0.12 + 60 + "vh";
        else
            ponto.style.left = (480 + 25 * (i - qtosSlides / 2)) * 0.12 + 60 + "vh";

        botoes.appendChild(ponto);
    }
}
function criarSlide(caminhoImagem, texto)
{
    $("#conteudo").attr('class', 'conteudoNovoSlideShow')
    var slide = document.createElement("div");
    slide.classList.add("slides");
    slide.classList.add("fade");

    if (texto != null && texto != "")
    {
        var h1 = document.createElement("h1");
        h1.className = "text";
        h1.innerText = texto;
        slide.appendChild(h1);
    }

    if (caminhoImagem != null && caminhoImagem != "")
    {
        var img = document.createElement("img");
        img.src = caminhoImagem;
        img.style.width = "100%";

        slide.appendChild(img);
    }
    document.getElementById("conteinerSlides").appendChild(slide);

    qtosSlides++;

    var botoes = document.getElementById("botoes");
    botoes.innerHTML = "";

    for (var i = 0; i < qtosSlides; i++)
    {
        var ponto = document.createElement("span");
        ponto.className = "btn";
        ponto.id = (i + 1).toString();
        ponto.addEventListener("click", function() {mudarSlide(parseInt(this.id))});
        if (qtosSlides % 2 != 0)
            ponto.style.left = (468 + 25 * (i - Math.floor(qtosSlides / 2))) * 0.12 + "vh";
        else
            ponto.style.left = (480 + 25 * (i - qtosSlides / 2)) * 0.12 + "vh";

        botoes.appendChild(ponto);
    }

}