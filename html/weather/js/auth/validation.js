const registerForm = document.getElementById('register-form');
// *******************Валідація**********************
export const errorMessage = document.querySelector('.error-message');
export const submitButton = document.getElementById('submitButton');
export const firstName = document.getElementById('first-name-input');
export const email = document.getElementById('email-input');
export const password = document.getElementById('password-input');
export const confirmPassword = document.getElementById('confirm-password-input');
export const agreeCheckbox = document.getElementById('agreeCheckbox');
export function validateForm() {
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
  const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  if (!nameRegex.test(firstName.value)) {
    errorMessage.textContent =
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
    isValid = false;
  }
  // Перевірка корректності email
  const emailRegex =
    /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.textContent = 'Please enter valid email address, for example  example@gmail.com';
    isValid = false;
  }

  // Перевірка пароля
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    errorMessage.textContent =
      'Please enter your password. Minimum length 8 symbols. Symbols _#! Min 1 Big and 1 small letter ';
    isValid = false;
  }
  // Перевірка співпадіння паролей
  if (password.value !== confirmPassword.value) {
    errorMessage.textContent = 'Passwords do not match. Please check the entered data.';
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
export function updateSubmitButtonState() {
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
