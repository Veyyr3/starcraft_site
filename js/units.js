let unitImages = document.querySelectorAll('.unit-container img');
let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImg');
let modalCaption = document.getElementById('modalCaption');
let modalClose = document.getElementById('modalClose');

// 1. Событие dblclick — открытие модального окна при двойном клике на фото
unitImages.forEach(img => {
    img.addEventListener('dblclick', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
        
        // Берём подпись юнита из соседнего тега <p>
        let unitName = img.nextElementSibling ? img.nextElementSibling.innerText : '';
        modalCaption.innerText = unitName;
    });
});

// 2. Событие click — закрытие по крестику
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

// 3. Событие click — закрытие при клике мимо картинки (на тёмный фон)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});