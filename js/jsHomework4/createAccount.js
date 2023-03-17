const form = document.querySelector('form');
const svg = document.querySelectorAll('svg');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const agreeCheckbox = document.querySelector('input[type="checkbox"]');
const errorMessage = document.querySelector('.error-message');
const submitButton = document.querySelector('button[type="submit"]');
const inputList = document.querySelectorAll('input');
const labelList = document.querySelectorAll('label');
const inputs = document.querySelectorAll('.input-wrapper input');

///Перевірка input на наявність значення для додавання класу
inputList.forEach(function (input, index) {
  input.addEventListener('focus', function () {
    inputs.forEach(function (i) {
      if (i !== input) {
        i.style.backgroundColor = '';
      }
    });
    if (input.value.trim() === '') {
      labelList[index].classList.remove('labelListOutFocus');
      labelList[index].classList.add('labelListOnFocus');
      input.style.backgroundColor = 'white';
    }
  });

  input.addEventListener('blur', function () {
    if (input.value.trim() === '') {
      labelList[index].classList.remove('labelListOnFocus');
      labelList[index].classList.add('labelListOutFocus');
      input.style.backgroundColor = '';
    }
  });
  // Перевірка вводу даних в полях після першої невірної валідації для додавання класу
  input.addEventListener('input', function () {
    const value = input.value;
    if (value === '') {
      input.style.backgroundColor = '';
      labelList[index].classList.remove('labelListOnFocus');
      return;
    } else {
      labelList[index].classList.add('labelListOnFocus');
      // input.style.backgroundColor = '';
    }
  });
});

function validateForm() {
  let isValid = true;
  // Перевірка усіх полів вводу та чекбокса
  if (
    fullNameInput.value === '' ||
    emailInput.value === '' ||
    phoneInput.value === '' ||
    passwordInput.value === '' ||
    confirmPasswordInput.value === '' ||
    !agreeCheckbox.checked
  ) {
    isValid = false;
  }
  //Перевірка імені
  const fullNameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  if (!fullNameRegex.test(fullNameInput.value)) {
    errorMessage.textContent =
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
    isValid = false;
  }
  // Перевірка корректності email
  const emailRegex =
    /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    errorMessage.textContent = 'Please enter valid email address, for example  example @gmail.com';
    isValid = false;
  }
  // Перевірка номера телефона
  const phoneRegex =
    /^(?!.*(\+375|\+7)).*\+\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d$/;
  if (!phoneRegex.test(phoneInput.value)) {
    errorMessage.textContent =
      'Phone isn’t correct!Must be in format +XX(XXX)XXX-XX-XX. Number +375 and +7 can’t be valid.';
    isValid = false;
  }
  // Перевірка пароля
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    errorMessage.textContent =
      'Please enter your password. Minimum length 8 symbols. Symbols _#! Min 1 Big and 1 small letter ';
    isValid = false;
  }
  // Перевірка співпадіння паролей
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.textContent = 'Passwords do not match. Please check the entered data.';
    isValid = false;
  }
  submitButton.disabled = !isValid;
  return isValid;
}
// **********************************************
function updateSubmitButtonState() {
  submitButton.disabled = !validateForm();
}
// Перевірка поля після першої невдалої валідації
const inputFields = [fullNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];

inputFields.forEach(input => {
  input.addEventListener('input', () => {
    input.style.backgroundColor = '';
    errorMessage.textContent = '';
    updateSubmitButtonState();
  });
});

agreeCheckbox.addEventListener('change', () => {
  errorMessage.textContent = '';
  updateSubmitButtonState();
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validateForm()) {
    errorMessage.textContent = 'Please fill in all fields and agree to the Terms of Use.';
    return;
  } else {
    errorMessage.textContent = '';
    Notiflix.Report.success(
      'Success',
      'Thank you! Your account has been successfully created!',
      'OK'
    );
    // alert('Thank you! Your account has been successfully created!');
    form.reset();
    updateSubmitButtonState();
  }
  // submitButton.disabled = !isValid;
});
// Оновленя стану кнопки відправки при завантаженні сторінки
updateSubmitButtonState();

//  ************************************************************************************************
// Нотатки
// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Перевірка на заповненість всіх полів
//   if (
//     fullNameInput.value === '' ||
//     emailInput.value === '' ||
//     phoneInput.value === '' ||
//     passwordInput.value === '' ||
//     confirmPasswordInput.value === '' ||
//     !agreeCheckbox.checked
//   ) {
//     errorMessage.textContent =
//       'Будь ласка, заповніть всі поля та погодьтесь з Умовами використання.';
//     isValid = false;
//     return;
//   }
//   // Перевірка на співпадіння паролів
//   if (passwordInput.value !== confirmPasswordInput.value) {
//     errorMessage.textContent = 'Паролі не співпадають. Будь ласка, перевірте введені дані.';
//     confirmPasswordInput.style.backgroundColor = 'red';
//     isValid = false;
//     return;
//   }
//   // Якщо всі поля заповнені та паролі співпадають

//     errorMessage.textContent = '';
//     alert('Ваш обліковий запис успішно створено!');
//     form.reset();
//     inputs.forEach(function (input) {
//       if (input.style.backgroundColor === 'green') {
//         input.style.backgroundColor = '';
//       }
//     });
//     labelList.forEach(function (label) {
//       label.classList.add('labelListOutFocus');
//     });

// });

// // ...Перевірка пошти
// emailInput.addEventListener('input', function () {
//   const value = emailInput.value;
//   const regex = /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
//   if (regex.test(value)) {
//     errorMessage.textContent = 'Email is correct!';
//     emailInput.style.backgroundColor = 'green';
//   } else {
//     errorMessage.textContent = 'Email is not correct!';
//     emailInput.style.backgroundColor = 'red';
//     isValid = false;
//   }
// });
// // Перевірка номера телефону
// phoneInput.addEventListener('input', function () {
//   const phone = phoneInput.value;
//   const regex =
//     /^\+\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d$/;
//   if (regex.test(phone)) {
//     phoneInput.style.backgroundColor = 'green';
//     isValid = true;
//   } else {
//     phoneInput.style.backgroundColor = 'red';
//     errorMessage.textContent = 'Phone is not correct!Must be in format +XX(XXX)XXX-XX-XX';
//     isValid = false;
//   }
// });
// ////Перевірка паролю.......
// passwordInput.addEventListener('input', function () {
//   const password = passwordInput.value;
//   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
//   if (regex.test(password)) {
//     passwordInput.style.backgroundColor = 'green';
//   } else {
//     passwordInput.style.backgroundColor = 'red';
//     isValid = false;
//   }
// });
// // Додаемо слухача подій на FullName
// fullNameInput.addEventListener('input', () => {
//   fullNameInput.style.backgroundColor = '';
//   errorMessage.textContent = '';
//   updateSubmitButtonState();
// });
// // Додаемо слухача подій на телефон
// phoneInput.addEventListener('input', () => {
//   phoneInput.style.backgroundColor = '';
//   errorMessage.textContent = '';
//   updateSubmitButtonState();
// });
// //Слухач на пароль
// passwordInput.addEventListener('input', () => {
//   passwordInput.style.backgroundColor = '';
//   errorMessage.textContent = '';
//   updateSubmitButtonState();
// });
// //Слухач на підтвердження паролю
// confirmPasswordInput.addEventListener('input', () => {
//   confirmPasswordInput.style.backgroundColor = '';
//   errorMessage.textContent = '';
//   updateSubmitButtonState();
// });
// **********2*********************************************************************************************************8
// const form = document.querySelector('form');
// const svg = document.querySelectorAll('svg');
// const fullNameInput = document.getElementById('full-name');
// const emailInput = document.getElementById('email');
// const phoneInput = document.getElementById('phone');
// const passwordInput = document.getElementById('password');
// const confirmPasswordInput = document.getElementById('confirm-password');
// const agreeCheckbox = document.querySelector('input[type="checkbox"]');
// const errorMessage = document.querySelector('.error-message');
// const submitButton = document.querySelector('button[type="submit"]');
// const inputList = document.querySelectorAll('input');
// const labelList = document.querySelectorAll('label');
// const inputs = document.querySelectorAll('.input-wrapper input');

// // Функція валідації імені
// function validateFullName() {
//   const fullNameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
//   if (!fullNameRegex.test(fullNameInput.value)) {
//     fullNameInput.classList.add('input-error');
//     errorMessage.textContent =
//       "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
//     return false;
//   } else {
//     fullNameInput.classList.remove('input-error');
//     errorMessage.textContent = '';
//     return true;
//   }
// }

// // Функція валідації електронної пошти
// function validateEmail() {
//   const emailRegex =
//     /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
//   if (!emailRegex.test(emailInput.value)) {
//     emailInput.classList.add('input-error');
//     errorMessage.textContent = 'Please enter valid email address, for example  example @gmail.com';
//     return false;
//   } else {
//     emailInput.classList.remove('input-error');
//     errorMessage.textContent = '';
//     return true;
//   }
// }

// // Функція валідації номера телефону
// function validatePhone() {
//     const regex =
//       /^\+\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d$/;
//   if (!phoneRegex.test(phoneInput.value)) {
//     phoneInput.classList.add('input-error');
//     errorMessage.textContent =
//       'Phone isn’t correct!Must be in format +XX(XXX)XXX-XX-XX. Number +375 and +7 can’t be valid.';
//     return false;
//   } else {
//     phoneInput.classList.remove('input-error');
//     errorMessage.textContent = '';
//     return true;
//   }
// }

// // Функція валідації пароля
// function validatePassword() {
// const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[#!])[0-9a-zA-Z#!]{8,}$/;
// if (!passwordRegex.test(passwordInput.value)) {
// passwordInput.classList.add('input-error');
// errorMessage.textContent =
// 'Please enter your password. Minimum length 8 symbols. Symbols _#! Min 1 Big and 1 small letter ';
// return false;
// } else {
// passwordInput.classList.remove('input-error');
// errorMessage.textContent = '';
// return true;
// }
// }

// // Функція валідації підтвердження пароля
// function validateConfirmPassword() {
// if (confirmPasswordInput.value !== passwordInput.value) {
// confirmPasswordInput.classList.add('input-error');
// errorMessage.textContent = 'Passwords do not match. Please check the entered data.';
// return false;
// } else {
// confirmPasswordInput.classList.remove('input-error');
// errorMessage.textContent = '';
// return true;
// }
// }

// // Перевірка наявності значення в полі вводу
// function validateInputValue(input) {
// if (input.value.trim() === '') {
// input.classList.add('input-error');
// return false;
// } else {
// input.classList.remove('input-error');
// return true;
// }
// }

// // Функція валідації усіх полів форми
// function validateForm() {
// const isValidFullName = validateFullName();
// const isValidEmail = validateEmail();
// const isValidPhone = validatePhone();
// const isValidPassword = validatePassword();
// const isValidConfirmPassword = validateConfirmPassword();
// const isValidInputValues = Array.from(inputList).every(validateInputValue);
// const isAgreeChecked = agreeCheckbox.checked;

// const isFormValid =
// isValidFullName &&
// isValidEmail &&
// isValidPhone &&
// isValidPassword &&
// isValidConfirmPassword &&
// isValidInputValues &&
// isAgreeChecked;

// submitButton.disabled = !isFormValid;
// return isFormValid;
// }

// // Оновлення стану кнопки відправки форми
// function updateSubmitButtonState() {
// submitButton.disabled = !validateForm();
// }

// // Перевірка поля після першої невдалої валідації
// inputList.forEach((input) => {
// input.addEventListener('input', () => {
// validateInputValue(input);
// updateSubmitButtonState();
// });
// });

// agreeCheckbox.addEventListener('change', () => {
// updateSubmitButtonState();
// });

// form.addEventListener('submit', (event) => {
// event.preventDefault();

// if (!validateForm()) {
// errorMessage.textContent = 'Please fill in all fields and agree to the Terms of Use.';
// return;
// } else {
// errorMessage.textContent = '';
// Notiflix.Report.success(
// 'Success',
// 'Thank you! Your account has been successfully created!',
// 'OK'
// );
// form.reset();
// updateSubmitButtonState();
// }
// });

// // Встановлення початкового стану
// updateSubmitButtonState();

// // Додавання обробки фокусу на кожне поле вводу
// inputList.forEach((input) => {
// input.addEventListener('focus', () => {
// input.classList.add('input-focused');
// });

// input.addEventListener('blur', () => {
// input.classList.remove('input-focused');
// });
// });
