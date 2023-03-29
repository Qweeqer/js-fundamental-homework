export function showAuthorizationAlert() {
  const unauthorizedRedirect = sessionStorage.getItem('unauthorizedRedirect');
  if (unauthorizedRedirect) {
    sessionStorage.removeItem('unauthorizedRedirect');
    alert('Please complete Authorization!');
  }
}
// Викликати showAuthorizationAlert після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  showAuthorizationAlert();
});