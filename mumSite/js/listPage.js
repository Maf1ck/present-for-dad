
// const API_URL = "https://events-server-2vk9.onrender.com"; // Встав URL твого сервера
// // Функція для додавання події
// async function addEvent(title, date, time, photoFile) {
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('date', date);
//     formData.append('time', time);
//     formData.append('photo', photoFile);

//     try {
//         const response = await fetch(`${API_URL}/add-event`, {
//             method: 'POST',
//             body: formData,
//         });
//         if (!response.ok) throw new Error('Помилка додавання події');
//         console.log('Подію успішно додано!');
//         displayEvents(); // Оновлюємо список подій
//     } catch (e) {
//         console.error(e.message);
//     }
// }

// // Функція для отримання подій
// async function displayEvents() {
//     try {
//         const response = await fetch(`${API_URL}/get-events`);
//         if (!response.ok) throw new Error('Помилка отримання подій');
//         const events = await response.json();

//         const eventsContainer = document.getElementById('events-container');
//         eventsContainer.innerHTML = ''; // Очищаємо контейнер

//         events.forEach(event => {
//             const eventElement = document.createElement('div');
//             eventElement.innerHTML = `
//                 <div class="event">
//                     <h3>${event.title}</h3>
//                     <p>Дата: ${new Date(event.date).toLocaleDateString()}</p>
//                     <p>Час: ${event.time}</p>
//                     <img src="${event.photoURL}" alt="Фото події">
//                 </div>
//             `;
//             eventsContainer.appendChild(eventElement);
//         });
//     } catch (e) {
//         console.error(e.message);
//     }
// }

// // Слухач для форми додавання події
// const form = document.getElementById('eventForm');
// if (form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const title = document.getElementById('title').value;
//         const date = document.getElementById('date').value;
//         const time = document.getElementById('time').value;
//         const photoFile = document.getElementById('photo').files[0];

//         if (photoFile) {
//             addEvent(title, date, time, photoFile);
//         } else {
//             console.error('Файл фото не вибрано!');
//         }

//         e.target.reset();
//     });
// } else {
//     console.error('Форма не знайдена!');
// }

// // Викликаємо відображення подій при завантаженні сторінки
// displayEvents();
window.onload = updateGreetingsList;
// Функції навігації (додані в глобальний простір імен)
window.openNav = function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
};

window.closeNav = function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
