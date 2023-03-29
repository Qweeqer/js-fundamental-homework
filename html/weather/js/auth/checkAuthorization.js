export async function checkAuthorization() {
  const authToken = sessionStorage.getItem('authToken');
  if (!authToken) {
    sessionStorage.setItem('unauthorizedRedirect', 'true');
    window.location.href = 'weather.html';
  }
}

// Викликати checkAuthorization після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  checkAuthorization();
});
