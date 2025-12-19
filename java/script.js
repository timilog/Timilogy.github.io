// DOM полностью загружен
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. Мобильное меню
    // ====================
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Меняем иконку
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Закрываем меню при клике на ссылку (на мобильных)
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // ====================
    // 2. Форма обратной связи
    // ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Элементы формы
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        // Функция проверки email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Функция отображения ошибки
        function showError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            inputElement.style.borderColor = '#e74c3c';
        }

        // Функция очистки ошибки
        function clearError(inputElement, errorElement) {
            errorElement.textContent = '';
            inputElement.style.borderColor = '#ccc';
        }

        // Валидация в реальном времени
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Имя должно содержать минимум 2 символа');
            } else {
                clearError(nameInput, nameError);
            }
        });

        emailInput.addEventListener('input', () => {
            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Введите корректный email (например, name@mail.ru)');
            } else {
                clearError(emailInput, emailError);
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Сообщение должно содержать минимум 10 символов');
            } else {
                clearError(messageInput, messageError);
            }
        });

        // Обработка отправки формы
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Отменяем стандартную отправку

            let isValid = true;

            // Проверяем имя
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Имя должно содержать минимум 2 символа');
                isValid = false;
            }

            // Проверяем email
            if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Введите корректный email (например, name@mail.ru)');
                isValid = false;
            }

            // Проверяем сообщение
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }

            // Если форма валидна
            if (isValid) {
                // Здесь обычно код отправки данных на сервер (AJAX)
                // Например: fetch('send.php', { method: 'POST', body: new FormData(this) })

                // Сообщение об успехе
                alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
                contactForm.reset(); // Очищаем форму
                // Очищаем все ошибки
                clearError(nameInput, nameError);
                clearError(emailInput, emailError);
                clearError(messageInput, messageError);
            } else {
                // Прокрутка к первой ошибке
                const firstError = contactForm.querySelector('.form__error:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // ====================
    // 3. Обновление года в футере
    // ====================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ====================
    // 4. Плавная прокрутка для всех внутренних ссылок (кроме mailto и tel)
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================
    // 5. (Опционально) Добавляем подсказку при наведении на иконки соцсетей
    // ====================
    document.querySelectorAll('.social-link').forEach(link => {
        const platform = link.getAttribute('aria-label');
        link.setAttribute('title', platform);
    });

    // Сообщение в консоль (для отладки)
    console.log('Сайт загружен и готов к работе!');
});