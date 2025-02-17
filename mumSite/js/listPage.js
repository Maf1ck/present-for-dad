       
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
        import { getFirestore, collection, addDoc, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

        // Ваш веб-додаток Firebase конфігурації
        const firebaseConfig = {
            apiKey: "AIzaSyA1gksh4QvoeMIjXJy3Q5W_4_AAiGPuv98",
            authDomain: "site-famkoshman.firebaseapp.com",
            projectId: "site-famkoshman",
            storageBucket: "site-famkoshman.appspot.com",
            messagingSenderId: "265412039201",
            appId: "1:265412039201:web:7b38c2c50a6cbf56e98960"
};
// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Робота з Firestore
const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('events-container');
const eventsCollection = collection(db, "kRKu083dFkttPJKwZEN");

// Відправка даних у Firestore
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    try {
        await addDoc(eventsCollection, {
            title: title,
            date: date,
            time: time
        });

        // Очищення форми
        eventForm.reset();

        // Оновлення списку подій
        loadEvents();
    } catch (error) {
        console.error("Помилка при додаванні події: ", error);
    }
});

// Завантаження подій із Firestore
async function loadEvents() {
    eventsContainer.innerHTML = '';
    try {
        const querySnapshot = await getDocs(eventsCollection);
        querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.innerHTML = `
                <h2>${event.title}</h2>
                <p>${event.date ? `Дата: ${event.date}` : ''}</p>
                <p>${event.time ? `Час: ${event.time}` : ''}</p>
            `;
            eventsContainer.appendChild(eventElement);
        });
    } catch (error) {
        console.error("Помилка при завантаженні подій: ", error);
    }
}

// Завантаження подій при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadEvents);