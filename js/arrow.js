const scrollUpBtn = document.getElementById('up');

// Событие 1: scroll — появление/скрытие кнопки при прокрутке
window.addEventListener('scroll', () => {
    // Если прокрутили больше 300px, показываем кнопку
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

// Событие 2: click — плавный скролл в самый верх страницы
scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});