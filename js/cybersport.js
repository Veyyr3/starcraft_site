// берем формочку и добавляем событие с функцией регистрации
document.getElementById('tournamentForm').addEventListener('submit', registration);

// функция для регистрации на турнир
function registration(event) {
    // отмена стандартной отправки формы
    event.preventDefault();

    // значения ввода пользователя
    let fullname = document.getElementById('fullname').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();

    // те самые span для вывода ошибок
    let nameError = document.getElementById('nameError');
    let phoneError = document.getElementById('phoneError');
    let emailError = document.getElementById('emailError');
    let successMessage = document.getElementById('successMessage');

    // очищаем ошибки, если пользователь снова пытается отправить форму
    nameError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';
    successMessage.textContent = '';

    // считаем, что пока всё правильно
    let isValid = true;

    // выражение для ФИО (2 или 3 слова на кириллице)
    let nameRegExp = /^[А-ЯЁа-яё]+(\s[А-ЯЁа-яё]+){1,2}$/;
    if (!nameRegExp.test(fullname)) {
        nameError.textContent = 'Введите корректное ФИО (только кириллица, минимум Имя и Фамилия)';
        isValid = false;
    }

    // выражение для телефона (слитно писать нужно)
    let phoneRegExp = /^(\+?\d{1,3})?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if (!phoneRegExp.test(phone)) {
        phoneError.textContent = 'Введите корректный номер телефона (например, +99691234567)';
        isValid = false;
    }

    // выражение для E-mail
    let emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegExp.test(email)) {
        emailError.textContent = 'Введите корректный адрес электронной почты';
        isValid = false;
    }

    // если все поля прошли проверку
    if (isValid) {
        successMessage.textContent = 'Заявка успешно отправлена!';
    }
}