const DATA_URL = 'heroes.json'; // данные карточек json
const cardsContainer = document.querySelector('.cards-container'); // выбираю контейнер для карточек (это сетка)

// асинхронная функция для получения данных из JSON
async function loadHeroes() {
    // пробую
    try {
        const response = await fetch(DATA_URL);
        // если что-то пошло не так
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
        // если всё окей, то рендерим наши карточки
        const heroesData = await response.json();
        renderHeroesList(heroesData);
    } catch (error) { // ловлю ошибку
        console.error('Ошибка JSON:', error);
        cardsContainer.innerHTML = '<p style="color: red;">Не удалось загрузить карточки персонажей!</p>';
    }
}

// функция для рендера карточек
function renderHeroesList(heroes) {
    cardsContainer.innerHTML = ''; // выбираем сетку с карточками
    // для каждой карточки
    heroes.forEach(hero => {
        const card = document.createElement("div");
        card.className = "card";
        // Подробная информация будет показываться, при наведении на карточку (она переворачивается)
        card.innerHTML = `
            <div class="card-front">
                <img src="${hero.image}" alt="${hero.name}">
                <p class="hero-name">${hero.name}</p>
            </div>
            <div class="card-back">
                <p class="hero-description">${hero.description}</p>
            </div>
        `;
        cardsContainer.appendChild(card); // добавляем карточку
    });
}
// запускаем асинхронную функцию когда страница полностью загрузится
document.addEventListener('DOMContentLoaded', loadHeroes);