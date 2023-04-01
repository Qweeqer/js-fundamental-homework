// ***********2****Cookies****************************
import { getToken, removeToken } from './auth.js';

// ***************END*********************************
export function showAuthorizationAlert() {
  // ****************1*****TOKEN*****************************
  // const unauthorizedRedirect = sessionStorage.getItem('unauthorizedRedirect');
  // ***************END*********************************
  // **********2*****Cookies****************************
  const unauthorizedRedirect = getToken('unauthorizedRedirect');
  // ***************END*********************************
  if (unauthorizedRedirect) {
    // ****************1*****TOKEN*****************************
    // sessionStorage.removeItem('unauthorizedRedirect');
    // ***************END*********************************

    // **********2*****Cookies****************************
    removeToken('unauthorizedRedirect');
    // ***************END*********************************
    alert('Please complete Authorization!');
  }
}
// Викликати showAuthorizationAlert після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  showAuthorizationAlert();
});
