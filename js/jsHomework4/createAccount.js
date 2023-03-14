const form = document.querySelector('form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const agreeCheckbox = document.querySelector('input[type="checkbox"]');
const errorMessage = document.querySelector('.error-message');
const submitButton = document.querySelector('button[type="submit"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Перевірка на заповненість всіх полів
  if (
    fullNameInput.value === '' ||
    emailInput.value === '' ||
    phoneInput.value === '' ||
    passwordInput.value === '' ||
    confirmPasswordInput.value === '' ||
    !agreeCheckbox.checked
  ) {
    errorMessage.textContent =
      'Будь ласка, заповніть всі поля та погодьтесь з Умовами використання.';
    return;
  }

  // Перевірка на співпадіння паролів
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.textContent = 'Паролі не співпадають. Будь ласка, перевірте введені дані.';
    confirmPasswordInput.style.backgroundColor = 'red';
    return;
  }

  // Якщо всі поля заповнені та паролі співпадають
  errorMessage.textContent = '';
  alert('Ваш обліковий запис успішно створено!');
});

// Перевірка вводу даних в полях після першої невірної валідації
fullNameInput.addEventListener('input', function () {
  fullNameInput.style.backgroundColor = '';
  errorMessage.textContent = '';
});

emailInput.addEventListener('input', function () {
  emailInput.style.backgroundColor = '';
  errorMessage.textContent = '';
});

phoneInput.addEventListener('input', function () {
  phoneInput.style.backgroundColor = '';
  errorMessage.textContent = '';
});

passwordInput.addEventListener('input', function () {
  passwordInput.style.backgroundColor = '';
  confirmPasswordInput.style.backgroundColor = '';
  errorMessage.textContent = '';
});

confirmPasswordInput.addEventListener('input', function () {
  passwordInput.style.backgroundColor = '';
  confirmPasswordInput.style.backgroundColor = '';
  errorMessage.textContent = '';
});

agreeCheckbox.addEventListener('change', function () {
  errorMessage.textContent = '';
});
// ...Перевірка пошти
emailInput.addEventListener('input', function () {
  const value = emailInput.value;
  const regex = /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (regex.test(value)) {
    errorMessage.textContent = 'Email is correct!';
    emailInput.style.backgroundColor = 'green';
  } else {
    errorMessage.textContent = 'Email is not correct!';
    emailInput.style.backgroundColor = 'red';
  }
});
////Перевірка паролю.......
passwordInput.addEventListener('input', function () {
  const value = passwordInput.value;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (regex.test(value)) {
    passwordInput.style.backgroundColor = 'green';
  } else {
    passwordInput.style.backgroundColor = 'red';
  }
});
///Перевірка
