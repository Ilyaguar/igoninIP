const images = [
    "media/gallery1.jpeg",
    "media/gallery2.jpg",
    "media/gallery3.jpg",
    "media/gallery4.jpg",
    "media/gallery5.jpeg",
    "media/gallery6.jpg"
];
let currentIndex = 0;
const numStrips = 5;

function openModal(index) {
    if (index >= 0 && index < images.length) {
        currentIndex = index;
        document.getElementById("modal").style.display = "flex";
        updateSlide();
    }
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    animateSlide();
}

function updateSlide() {
    const slideContainer = document.getElementById("slide-container");
    slideContainer.innerHTML = "";
    
    const stripWidth = 100 / numStrips; // Ширина каждой полосы в %
    
    for (let i = 0; i < numStrips; i++) {
        const strip = document.createElement("div");
        strip.classList.add("slide-strip");
        strip.style.width = `${stripWidth}%`;
        strip.style.left = `${i * stripWidth}%`; // Размещаем полосы без разрывов
        strip.style.backgroundImage = `url(${images[currentIndex]})`;
        strip.style.backgroundSize = `${numStrips * 100}% 100%`;
        strip.style.backgroundPosition = `-${i * 100}% center`;
        slideContainer.appendChild(strip);
    }
}


function animateSlide() {
    const strips = document.querySelectorAll(".slide-strip");
    strips.forEach((strip, index) => {
        strip.style.transform = `translateY(${index % 2 === 0 ? "-100%" : "100%"})`;
        setTimeout(() => {
            strip.style.transition = "none";
            strip.style.transform = "translateY(0)";
            strip.style.backgroundImage = `url(${images[currentIndex]})`;
            setTimeout(() => {
                strip.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        }, 500);
    });
}