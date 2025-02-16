// Імпортуємо Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js';

// Конфігурація Firebase
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
const storage = getStorage(app);

// Функція для додавання події
async function addEvent(title, date, time, photoFile) {
    try {
        // Перевірка на наявність файлу
        if (!photoFile) {
            console.error('Файл фото не вибрано!');
            return;
        }

        // Завантаження файлу до Firebase Storage
        const storageRef = ref(storage, `photos/${encodeURIComponent(photoFile.name)}`);
        console.log('Завантаження файлу...', photoFile.name); // Логування для перевірки

        const snapshot = await uploadBytes(storageRef, photoFile);
        console.log('Файл завантажено:', snapshot);

        const photoURL = await getDownloadURL(snapshot.ref);
        console.log('URL фото:', photoURL);

        // Додавання події до Firestore
        await addDoc(collection(db, 'important-dates'), {
            title: title,
            date: new Date(date), // Використовуємо Date для timestamp
            time: time,
            photoURL: photoURL // Збереження URL фото
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
                    <p>Дата: ${new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
                    <p>Час: ${event.time}</p>
                    <img src="${event.photoURL}" alt="Фото події">
                </div>
            `;
            eventsContainer.appendChild(eventElement);
        });
    } catch (e) {
        console.error('Помилка при отриманні подій:', e);
    }
}

// Додаємо слухач для кнопки "Додати подію"
const form = document.getElementById('eventForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const photoFile = document.getElementById('photo').files[0]; // Отримуємо файл

        if (photoFile) {
            addEvent(title, date, time, photoFile);
        } else {
            console.error('Файл фото не вибрано!');
        }

        e.target.reset();
    });
} else {
    console.error('Форма не знайдена!');
}

// Викликаємо відображення подій при завантаженні сторінки
displayEvents();
