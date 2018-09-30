var slideIndex = 1;
mostrarSlide(slideIndex);

// Next/previous controls
function avancarSlide(n) {
    mostrarSlide(slideIndex += n);
}

// Thumbnail image controls
function mudarSlide(n) {
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