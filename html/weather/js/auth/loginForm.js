import { getLogIn, showUserInfo } from './auth.js';
import { login } from '../modal/modalManager.js';
// ******************LOGIN FORM******************************************
export const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      await getLogIn({
        email: email.value,
        password: password.value,
      });
      // Токен вже збережений у localStorage усередині функції setToken
      login.style.display = 'none';
      dark.style.display = 'none';
      showUserInfo();
      window.location.href = 'profile.html';
    } catch (error) {
      console.error(error);
      alert('Login Error: ' + error);
    }
  });
}

// *******************END********************************************
