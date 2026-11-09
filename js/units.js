// переменные модального окна и фото юнитов
let unitImages = document.querySelectorAll('.unit-container img');
let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImg');
let modalCaption = document.getElementById('modalCaption');
let modalClose = document.getElementById('modalClose');

// событие dblclick - открытие модального окна при двойном клике на фото
unitImages.forEach(img => {
    img.addEventListener('dblclick', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
        
        // берём подпись юнита из соседнего тега <p>
        let unitName = img.nextElementSibling ? img.nextElementSibling.innerText : '';
        modalCaption.innerText = unitName;
    });
});

// событие click - закрытие по крестику
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

// событие click - закрытие при клике мимо картинки
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});