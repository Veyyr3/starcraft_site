// кнопка вверх
const scrollUpBtn = document.getElementById('up');

// появление/скрытие кнопки при прокрутке
window.addEventListener('scroll', () => {
    // если прокрутили больше 300px, то показываем кнопку
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

// скролл в самый верх страницы
scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});