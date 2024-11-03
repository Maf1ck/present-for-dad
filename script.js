var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    // Перевірка наявності слайдів
    if (slides.length === 0) {
        console.error("Слайди не знайдено");
        return;
    }

    // Приховуємо всі слайди спочатку
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Збільшуємо індекс, щоб відобразити наступний слайд
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}

    // Відображаємо поточний слайд і відповідну точку
    slides[slideIndex - 1].style.display = "block";
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";

    // Запускаємо зміну слайду кожні 2 секунди
    setTimeout(showSlides, 2000);
}

