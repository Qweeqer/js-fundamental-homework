const BASE_URL = 'https://connections-api.herokuapp.com';
let token = '';

export const setToken = newToken => {
  token = newToken;
  localStorage.setItem('authToken', newToken);
};

// Відновлюємо токен з localStorage
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
  token = storedToken;
}

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const getSignUp = async data => {
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

const getLogIn = async data => {
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

export const getCurrent = async () => {
  if (!token) {
    return null;
  }

  const options = {
    method: 'GET',
    headers: getHeaders(),
  };

  try {
    const response = await fetch(`${BASE_URL}/users/current`, options);

    if (response.status === 401) {
      setToken('');
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    setToken('');
    console.error('Error in getCurrent:', error);
    throw error;
  }
};

const handleLogout = async () => {
  try {
    await getLogOut();
    hideUserInfo();
    const loginForm = document.getElementById('Login');
    loginForm.style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Log Out Error');
  }
};

const showUserInfo = async () => {
  const currentUser = await getCurrent();
  const username = currentUser.name;
  const welcomeMessage = document.createElement('p');
  welcomeMessage.textContent = `Welcome, ${username}!`;
  const loginForm = document.getElementById('Login');

  // Перевірка наявності елемента loginForm перед зміною його стилю
  if (loginForm) {
    loginForm.style.display = 'none';
  }

  const userInfo = document.getElementById('UserInfo');

  if (userInfo) {
    userInfo.appendChild(welcomeMessage);
    userInfo.style.display = 'block';
  }
};

const hideUserInfo = () => {
  const userInfo = document.getElementById('UserInfo');
  userInfo.style.display = 'none';
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
    console.error(error);
    hideUserInfo();
  }
};
// *******************registerForm*************************************
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async event => {
    event.preventDefault();

    const { firstName, email, password, confirmPassword } =
      event.target.elements;
    // Валідація

    if (!validateForm()) {
      errorMessage.textContent =
        'Please fill in all fields and agree to the Terms of Use.';
      return;
    } else {
      errorMessage.textContent = '';
      alert('Thank you! Your account has been successfully created!');
      updateSubmitButtonState();
    }
    updateSubmitButtonState();
    /////
    try {
      await getSignUp({
        name: firstName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      setTimeout(async () => {
        const userContainer = document.getElementById('UserInfo');
        const user = await getCurrent();
        console.log('user', user);
        if (user) {
          userContainer.innerHTML = `<p>Ім’я користувача: ${user.name}</p> <p>Email: ${user.email}</p>`;

          const logoutButton = document.createElement('button');
          logoutButton.id = 'logout-button';
          logoutButton.textContent = 'Log Out';
          userContainer.appendChild(logoutButton);
          logoutButton.addEventListener('click', handleLogout);

          register.style.display = 'none';
          dark.style.display = 'none';
          showUserInfo();
          window.location.href = 'profile.html';
        } else {
          throw new Error('User is null');
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Registration Error: ' + error);
    }
  });
}
// *******************END********************************************
// ******************LOGIN FORM******************************************
const loginForm = document.getElementById('login-form');

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

// ініціалізація додатка
document.addEventListener('DOMContentLoaded', () => {
  init();
});

let regButton = document.getElementById('reg-button');
let logButton = document.getElementById('log-button');
let buttonX1 = document.getElementById('button-x1');
let buttonX2 = document.getElementById('button-x2');
let register = document.getElementById('Register');
let login = document.getElementById('Login');
let dark = document.getElementById('dark');

if (regButton) {
  regButton.addEventListener('click', function () {
    dark.style.display = 'block';
    register.style.display = 'block';
    register.style.animation = 'slideDown 400ms ease';
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
// *******************Валідація**********************
const errorMessage = document.querySelector('.error-message');
const submitButton = document.getElementById('submitButton');
const firstName = document.getElementById('first-name-input');
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const confirmPassword = document.getElementById('confirm-password-input');
const agreeCheckbox = document.getElementById('agreeCheckbox');
function validateForm() {
  let isValid = true;
  // Перевірка усіх полів вводу та чекбокса
  if (
    firstName.value === '' ||
    email.value === '' ||
    password.value === '' ||
    confirmPassword.value === '' ||
    !agreeCheckbox.checked
  ) {
    isValid = false;
  }
  //Перевірка імені
  const nameRegex =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  if (!nameRegex.test(firstName.value)) {
    errorMessage.textContent =
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
    isValid = false;
  }
  // Перевірка корректності email
  const emailRegex =
    /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.textContent =
      'Please enter valid email address, for example  example @gmail.com';
    isValid = false;
  }

  // Перевірка пароля
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    errorMessage.textContent =
      'Please enter your password. Minimum length 8 symbols. Symbols _#! Min 1 Big and 1 small letter ';
    isValid = false;
  }
  // Перевірка співпадіння паролей
  if (password.value !== confirmPassword.value) {
    errorMessage.textContent =
      'Passwords do not match. Please check the entered data.';
    isValid = false;
  }
  submitButton.disabled = !isValid;
  return isValid;
}
if (agreeCheckbox) {
  agreeCheckbox.addEventListener('change', () => {
    errorMessage.textContent = '';
    updateSubmitButtonState();
  });
}
// ***************Оновлення статусу полів та відповідно кнопки сабміту*******************************
function updateSubmitButtonState() {
  submitButton.disabled = !validateForm();
}
if (registerForm) {
  // Перевірка поля після першої невдалої валідації
  const inputFields = [firstName, email, password, confirmPassword];
  inputFields.forEach(input => {
    input.addEventListener('input', () => {
      input.style.backgroundColor = '';
      errorMessage.textContent = '';
      updateSubmitButtonState();
    });
  });
}

// **********************************************
