// ====== CONTROLE DO CARROSSEL (SLIDER BARBEARIA) ======
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function getVisibleSlidesCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3; // Exibe 3 fotos simultâneas no desktop
}

function updateSlider() {
    if (slides.length === 0) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

function nextSlide() {
    const visibleSlides = getVisibleSlidesCount();
    const maxIndex = slides.length - visibleSlides;
    
    if (index >= maxIndex) {
        index = 0; // Reseta voltando para o começo
    } else {
        index++;
    }
    updateSlider();
}

function prevSlide() {
    const visibleSlides = getVisibleSlidesCount();
    const maxIndex = slides.length - visibleSlides;
    
    if (index <= 0) {
        index = maxIndex; // Salta para o fim
    } else {
        index--;
    }
    updateSlider();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
}

// Movimento automático a cada 4 segundos
let autoSlideInterval = setInterval(nextSlide, 4000);

function resetTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
}

// Ajusta o alinhamento caso mude o tamanho de tela em tempo real
window.addEventListener('resize', () => {
    index = 0; 
    updateSlider();
});