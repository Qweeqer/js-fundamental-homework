// Перевірки авторизації користувача перед переходом на сторінку profile.html,

//  перевірки наявності токена у localStorage.
export function checkAuthorization() {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    alert('Please complete Authorization!');
    event.preventDefault(); // Заборонити перехід на сторінку
    window.location.href = 'weather.html'; //  на сторінку входу
  }
}
// // Виклик перевірки
document.addEventListener('DOMContentLoaded', checkAuthorization);
