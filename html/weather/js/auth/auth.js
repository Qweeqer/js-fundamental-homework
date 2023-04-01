import './registerForm.js';
// import { registerForm } from './registerForm.js';
import './loginForm.js';
import { initializeModals } from '../modal/modalManager.js';
const BASE_URL = 'https://connections-api.herokuapp.com';
let token = '';
// *********1******Token****sessionStorage**************************************8
// export const setToken = newToken => {
//   token = newToken;
//   sessionStorage.setItem('authToken', newToken);
// };

// Відновлюємо токен з sessionStorage
// const storedToken = sessionStorage.getItem('authToken');
// if (storedToken) {
//   token = storedToken;
// }
// ****************END****************************************
// ************2********Використання cookies замість localStorage sessionStorage*****************
export const setToken = newToken => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // токен буде дійсний протягом 24 годин
  document.cookie = `authToken=${newToken};expires=${expires.toUTCString()};path=/`;
};

export const getToken = () => {
  const name = 'authToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const removeToken = () => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

// ******************END**********************************
export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getSignUp = async data => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  };

  const response = await fetch(`${BASE_URL}/users/signup`, options);
  const result = await response.json();
  setToken(result.token);
  return result;
};

export const getLogIn = async data => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  };

  const response = await fetch(`${BASE_URL}/users/login`, options);
  const result = await response.json();
  if (response.ok) {
    // перевірка статусу відповіді сервера
    setToken(result.token);
    return result;
  } else {
    throw new Error(result.message || 'Login failed');
  }
};

export const getLogOut = async () => {
  const options = {
    method: 'POST',
    headers: getHeaders(),
  };

  const response = await fetch(`${BASE_URL}/users/logout`, options);
  const data = await response.json();
  setToken('');
  return data;
};
// **********1*********token getCurrent*******************
// export const getCurrent = async () => {
//   if (!token) {
//     return null;
//   }

//   const options = {
//     method: 'GET',
//     headers: getHeaders(),
//   };

//   try {
//     const response = await fetch(`${BASE_URL}/users/current`, options);

//     if (response.status === 401) {
//       setToken('');
//       throw new Error('Unauthorized');
//     }

//     const data = await response.json();
//     ///////////////////////////////////////////////////////////
//     console.log('User data:', data); // Виводимо об'єкт користувача в консоль
//     //////////////////////////////////////////////////////////////////
//     return data;
//   } catch (error) {
//     setToken('');
//     console.error('Error in getCurrent:', error);
//     throw error;
//   }
// };
// ********************************END*********************************
// **********2*********cookie getCurrent*******************
export const getCurrent = async () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    // console.log('document.cookie', document.cookie);
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});

  if (!cookies.authToken) {
    return null;
  }

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.authToken}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/users/current`, options);

    if (response.status === 401) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    // console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Error in getCurrent:', error.message);
    throw error;
  }
};

// *********************END*************************************
export const handleLogout = async () => {
  try {
    await getLogOut();
    hideUserInfo();
    // const loginForm = document.getElementById('Login');
    // loginForm.style.display = 'block';
    const logOutForm = document.getElementById('logout-button');
    window.location.href = './weather.html';
  } catch (error) {
    console.error(error);
    alert('Log Out Error');
  }
};

export const showUserInfo = async () => {
  const currentUser = await getCurrent();
  const username = currentUser ? currentUser.name : '';
  const welcomeMessage = document.createElement('p');
  welcomeMessage.textContent = `Welcome, ${username}!`;
  const loginForm = document.getElementById('Login');
  // Перевірка наявності елемента loginForm перед зміною його стилю
  if (loginForm) {
    loginForm.style.display = 'none';
  }

  const userInfo = document.getElementById('UserInfo');

  if (userInfo) {
    if (currentUser) {
      userInfo.appendChild(welcomeMessage);
    }
    userInfo.style.display = 'block';
  }
};

const hideUserInfo = () => {
  const userInfo = document.getElementById('UserInfo');
  // userInfo.style.display = 'none';

  const logoutButton = document.getElementById('logout-button');
  // logoutButton.style.display = 'none';
  if (userInfo) {
    userInfo.style.display = 'none';
  }
};

const init = async () => {
  try {
    const currentUser = await getCurrent();
    if (currentUser) {
      showUserInfo();
    } else {
      hideUserInfo();
    }
  } catch (error) {
    console.error(error.message);
    hideUserInfo();
  }
};

// ініціалізація додатка
document.addEventListener('DOMContentLoaded', () => {
  init();
});

initializeModals();
