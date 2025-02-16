const burgerButton = document.querySelector('.header-btn');
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

/* Close/hide the sidenav */
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}

// Імпортуємо Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// Конфігурація Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA1gksh4QvoeMIjXJy3Q5W_4_AAiGPuv98",
    authDomain: "site-famkoshman.firebaseapp.com",
    projectId: "site-famkoshman",
    storageBucket: "site-famkoshman.appspot.com",
    messagingSenderId: "265412039201",
    appId: "1:265412039201:web:7b38c2c50a6cbf56e98960"
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функція для додавання події
async function addEvent(title, date, time, photoURL) {
    try {
        await addDoc(collection(db, 'important-dates'), {
            title: title,
            date: new Date(date), // Використовуємо Date для timestamp
            time: time,
            photoURL: photoURL
        });
        console.log('Подію успішно додано!');
        displayEvents(); // Оновлюємо список подій після додавання
    } catch (e) {
        console.error('Помилка при додаванні події:', e);
    }
}

// Функція для відображення подій
async function displayEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = ''; // Очищаємо контейнер перед оновленням

    try {
        const q = query(collection(db, 'important-dates'), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventElement = document.createElement('div');
            eventElement.innerHTML = `
                <div class="event">
                    <h3>${event.title}</h3>
                    <p>Дата: ${event.date.toDate().toLocaleDateString()}</p>
                    <p>Час: ${event.time}</p>
                    <img src="${event.photoURL}" alt="Фото події" style="max-width: 200px;">
                </div>
            `;
            eventsContainer.appendChild(eventElement);
        });
    } catch (e) {
        console.error('Помилка при отриманні подій:', e);
    }
}

// Додаємо слухач для кнопки "Додати подію"
document.getElementById('add-event-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const photoURL = document.getElementById('event-photo').value;

    addEvent(title, date, time, photoURL);

    // Очищення форми
    e.target.reset();
});

// Викликаємо відображення подій при завантаженні сторінки
displayEvents();