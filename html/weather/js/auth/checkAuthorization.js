// ********2*******Cookies****************************
import { getToken, setToken } from './auth.js';

// ***************END*********************************
export async function checkAuthorization() {

  // ****************1*****TOKEN*****************************
  // const authToken = sessionStorage.getItem('authToken');
  // ***************END*********************************

  // ******2*********Cookies****************************
  const authToken = getToken();
  // ***************END*********************************
  if (!authToken) {
    // ****************1*****TOKEN*****************************
    // sessionStorage.setItem('unauthorizedRedirect', 'true');
    // ***************END*********************************
    
    // *****2**********Cookies****************************
    setToken('unauthorizedRedirect', 'true');
    // ***************END*********************************
    window.location.href = 'weather.html';
  }
}

// Викликати checkAuthorization після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  checkAuthorization();
});
