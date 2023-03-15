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
///Перевірка input на наявність значення
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
  // Перевірка вводу даних в полях після першої невірної валідації
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

  // Проверка всех полей ввода и чекбокса
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
  // Проверка корректности email
  const emailRegex =
    /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    errorMessage.textContent = 'Please enter valid email address, for example  example @gmail.com';
    isValid = false;
  }
  // Проверка корректности номера телефона
  const phoneRegex =
    /^\+\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d(\s|\-|\(|\)|)?\d$/;
  if (!phoneRegex.test(phoneInput.value)) {
    errorMessage.textContent = 'Phone is not correct!Must be in format +XX(XXX)XXX-XX-XX';
    isValid = false;
  }
  // Проверка корректности пароля
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    errorMessage.textContent =
      'Please enter your password. Minimum length 8 symbols. Symbols _#! Min 1 Big and 1 small letter ';
    isValid = false;
  }

  // Проверка совпадения паролей
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.textContent = 'Паролі не співпадають. Будь ласка, перевірте введені дані.';
    isValid = false;
  }
  submitButton.disabled = !isValid;
  return isValid;
}
// **********************************************
function updateSubmitButtonState() {
  submitButton.disabled = !validateForm();
}
// Проверка ввода данных в полях после первой неверной валидации
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
// Добавление слушателя событий для поля ввода FullName
fullNameInput.addEventListener('input', () => {
  fullNameInput.style.backgroundColor = '';
  errorMessage.textContent = '';
  updateSubmitButtonState();
});
// Добавление слушателя событий для поля ввода телефона
phoneInput.addEventListener('input', () => {
  phoneInput.style.backgroundColor = '';
  errorMessage.textContent = '';
  updateSubmitButtonState();
});
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validateForm()) {
    errorMessage.textContent =
      'Будь ласка, заповніть всі поля та погодьтесь з Умовами використання.';
    return;
  } else {
    errorMessage.textContent = '';
    alert('Ваш обліковий запис успішно створено!');
    form.reset();
    updateSubmitButtonState();
  }
  // submitButton.disabled = !isValid;
});
// Обновление состояния кнопки отправки при загрузке страницы
updateSubmitButtonState();
