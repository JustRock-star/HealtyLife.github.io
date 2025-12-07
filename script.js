// ==================== НАВИГАЦИЯ ==================== //

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

function showPage(pageId) {
    // Закрыть мобильное меню
    navMenu.classList.remove('active');

    // Скрыть все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Показать выбранную страницу
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Прокрутить в начало страницы
    window.scrollTo(0, 0);
}

// Показать главную страницу по умолчанию
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        showPage(pageId);
    });
});

// Также предотвращение перезагрузки страницы при клике на логотип
document.querySelector('.logo').addEventListener('click', () => {
    showPage('home');
});

// ==================== КАЛЬКУЛЯТОР КАЛОРИЙ ==================== //

const calorieForm = document.getElementById('calorieForm');

calorieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    // Формула Харриса-Бенедикта
    let bmr; // Basal Metabolic Rate (основной метаболизм)

    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Общие дневные расходы энергии (TDEE)
    const tdee = Math.round(bmr * activity);

    // Расчет макронутриентов (30-30-40 для белков-жиров-углеводов)
    const protein = Math.round((tdee * 0.30) / 4); // 4 ккал на грамм
    const fat = Math.round((tdee * 0.30) / 9); // 9 ккал на грамм
    const carbs = Math.round((tdee * 0.40) / 4); // 4 ккал на грамм

    // Вывод результатов
    document.getElementById('resultCalories').textContent = tdee;
    document.getElementById('proteinResult').textContent = protein;
    document.getElementById('fatResult').textContent = fat;
    document.getElementById('carbsResult').textContent = carbs;

    const resultSection = document.getElementById('result');
    resultSection.style.display = 'block';

    // Плавная прокрутка к результатам
    resultSection.scrollIntoView({ behavior: 'smooth' });
});

// ==================== ДОПОЛНИТЕЛЬНАЯ ФУНКЦИОНАЛЬНОСТЬ ==================== //

// Анимация при прокрутке (для элементов)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдать за карточками
document.querySelectorAll('.nutrition-card, .myth-card, .phrase-card, .meal-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
