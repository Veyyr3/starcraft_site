document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('typedText');
    if (!container) return;

    const pTag = container.querySelector('p');
    if (!pTag) return;

    // сохраняем исходный текст и очищаем тег <p>
    const fullText = pTag.textContent.trim();
    pTag.textContent = '';
    
    // добавляем класс для мигающего курсора
    pTag.classList.add('typing-cursor');

    let index = 0;
    const speed = 25; // скорость печати (в миллисекундах на символ)

    function type() {
        if (index < fullText.length) {
            pTag.textContent += fullText.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // убираем курсор после окончания печати
            setTimeout(() => {
                pTag.classList.remove('typing-cursor');
            }, 1500);
        }
    }

    // запускаем печать
    type();
});