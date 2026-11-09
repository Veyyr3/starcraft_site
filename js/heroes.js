// JSON
const DATA_URL = 'heroes.json';
// Контейнер с карточками
const cardsContainer = document.querySelector('.cards-container');

// Элементы формы
const heroForm = document.getElementById('heroForm');
const heroIdInput = document.getElementById('heroId');
const heroNameInput = document.getElementById('heroName');
const heroImageInput = document.getElementById('heroImage');
const heroDescriptionInput = document.getElementById('heroDescription');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// все герои, которые были сохранены пользователем
let localHeroes = [];

// вспомогательная функция для сохранения в localStorage
function saveToLocalStorage() {
    localStorage.setItem('myHeroes', JSON.stringify(localHeroes));
}

// Экранирование
function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// =============== READ ===============
async function loadHeroes() {
    const savedHeroes = localStorage.getItem('myHeroes');
    
    // Проверяем, есть ли сохранение и не пустое ли оно
    if (savedHeroes && savedHeroes !== '[]') {
        localHeroes = JSON.parse(savedHeroes);
        renderHeroesList(localHeroes);
    } else {
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
            
            localHeroes = await response.json();
            saveToLocalStorage(); // Сохраняем в localStorage только ПОСЛЕ успешной загрузки из JSON
            renderHeroesList(localHeroes);
        } catch (error) {
            console.error('Ошибка JSON:', error);
            cardsContainer.innerHTML = '<p style="color: red;">Не удалось загрузить карточки персонажей!</p>';
        }
    }
}

// Отрисовка
function renderHeroesList(heroes) {
    cardsContainer.innerHTML = '';
    
    if (heroes.length === 0) {
        cardsContainer.innerHTML = '<p>Героев пока нет!</p>';
        return;
    }

    heroes.forEach(hero => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <div class="card-front">
                <img src="${escapeHtml(hero.image)}" alt="${escapeHtml(hero.name)}">
                <p class="hero-name">${escapeHtml(hero.name)}</p>
            </div>
            <div class="card-back">
                <p class="hero-description">${escapeHtml(hero.description)}</p>
                <div class="card-actions" style="margin-top: 10px;">
                    <button data-action="edit" data-id="${hero.id}">Редактировать</button>
                    <button data-action="delete" data-id="${hero.id}">Удалить</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Обработка кнопок в карточках (универсальный для производительности)
cardsContainer.addEventListener('click', (e) => { // слушать клики по сетке карточек
    const btn = e.target.closest('button[data-action]'); // если кликнули по кнопке
    if (!btn) return; // если промазали, то ничего не делаем

    const id = Number(btn.dataset.id); // берем id кнопки
    if (btn.dataset.action === 'edit') prepareUpdate(id); // если кнопка "редактировать"
    if (btn.dataset.action === 'delete') deleteHero(id); // если кнопка "удалить"
});

// =============== CREATE и UPDATE ===============
if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
        // отменить дефолтное поведение браузера
        e.preventDefault();

        // значения из полей
        const id = heroIdInput.value;
        const name = heroNameInput.value.trim();
        const image = heroImageInput.value.trim() || 'imgs/heroes/default.webp';
        const description = heroDescriptionInput.value.trim();

        // если ничо не заполнили
        if (!name || !description) {
            alert('Заполните имя и описание!');
            return;
        }

        // если есть id карточки
        if (id) {
            // ищем его и изменяем
            localHeroes = localHeroes.map(hero => 
                hero.id === Number(id) ? { id: Number(id), name, image, description } : hero
            );
        } else { // если нету
            const newId = localHeroes.length 
                ? Math.max(...localHeroes.map(h => h.id)) + 1 
                : 1;
            // создаём нового
            localHeroes.unshift({ id: newId, name, image, description });
        }

        saveToLocalStorage(); // Обновляем хранилище после добавления/изменения
        resetForm(); // очищаем поля формы
        renderHeroesList(localHeroes); // заново рисуем всё
    });
}

function prepareUpdate(id) {
    const hero = localHeroes.find(h => h.id === Number(id)); // ищем локального героя
    if (!hero) return; // если нету то ниче не делаем
    
    // заполяем поля формы для удобства
    heroIdInput.value = hero.id;
    heroNameInput.value = hero.name;
    heroImageInput.value = hero.image;
    heroDescriptionInput.value = hero.description;

    // меняем кнопочку на "сохранить"
    submitBtn.textContent = 'Сохранить изменения';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // возвращаем вверх
}

// DELETE
function deleteHero(id) {
    if (!confirm('Удалить этого героя?')) return; // подверждаем действие
    // удаляем его
    localHeroes = localHeroes.filter(h => h.id !== Number(id));
    saveToLocalStorage(); // Обновляем хранилище после удаления
    renderHeroesList(localHeroes); // снова рисуем
}

// функция для очистки формы
function resetForm() {
    if (!heroForm) return;
    heroIdInput.value = '';
    heroForm.reset();
    submitBtn.textContent = 'Добавить героя';
    cancelBtn.style.display = 'none';
}

// если нажали на отмену
if (cancelBtn) {
    cancelBtn.addEventListener('click', resetForm);
}

// Функция очищающая локальное хранилище
function resetAll() {
    localStorage.clear();
}

// ждем пока загрузится вся страница и загружаем карточки героев
document.addEventListener('DOMContentLoaded', loadHeroes);