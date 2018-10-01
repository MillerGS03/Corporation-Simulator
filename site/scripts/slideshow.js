var slideIndex = 1;
var qtosSlides = 0;
avancarSlide(1);
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
    var dots = document.getElementsByClassName("btn");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block"; 
    dots[slideIndex-1].className += " active";
}

function criarSlide(caminhoImagem, texto)
{
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
            ponto.style.left = 468 + 25 * (i - Math.floor(qtosSlides / 2)) + "px";
        else
            ponto.style.left = 480 + 25 * (i - qtosSlides / 2) + "px";

        botoes.appendChild(ponto);
    }

}