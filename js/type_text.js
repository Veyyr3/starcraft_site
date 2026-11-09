document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('typedText');
    if (!container) return;

    const pTag = container.querySelector('p');
    if (!pTag) return;

    // Сохраняем исходный текст и очищаем тег <p>
    const fullText = pTag.textContent.trim();
    pTag.textContent = '';
    
    // Добавляем класс для мигающего курсора
    pTag.classList.add('typing-cursor');

    let index = 0;
    const speed = 25; // Скорость печати (в миллисекундах на символ)

    function type() {
        if (index < fullText.length) {
            pTag.textContent += fullText.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // Убираем курсор после окончания печати (по желанию)
            setTimeout(() => {
                pTag.classList.remove('typing-cursor');
            }, 1500);
        }
    }

    // Запускаем печать
    type();
});