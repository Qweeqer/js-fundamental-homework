import { mapElement } from './mapService.js';
const regButton = document.getElementById('reg-button');
const logButton = document.getElementById('log-button');
const buttonX1 = document.getElementById('button-x1');
const buttonX2 = document.getElementById('button-x2');
export const register = document.getElementById('Register');
export const login = document.getElementById('Login');
const dark = document.getElementById('dark');
export function initializeModals() {
  if (regButton) {
    regButton.addEventListener('click', function () {
      dark.style.display = 'block';
      register.style.display = 'block';
        register.style.animation = 'slideDown 400ms ease';
        mapElement.style.zIndex = '-1';
    });
  }
  if (buttonX1) {
    buttonX1.addEventListener('click', function () {
      register.style.display = 'none';
      dark.style.display = 'none';
    });
  }
  if (logButton) {
    logButton.addEventListener('click', function () {
      dark.style.display = 'block';
      login.style.display = 'block';
      login.style.animation = 'slideDown 400ms ease';
    });
  }
  if (buttonX2) {
    buttonX2.addEventListener('click', function () {
      login.style.display = 'none';
      dark.style.display = 'none';
    });
  }
}
