// ===== CARRUSEL AUTOMÁTICO =====

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".hero-carousel .slide");
  let current = 0;

  function moverCarrusel() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(moverCarrusel, 4000); // Cambia cada 4 segundos

});