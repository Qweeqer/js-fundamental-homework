// const form = document.querySelector('form');
// // const fullNameInput = document.getElementById('full-name');
// const emailInput = document.getElementById('email');
// // const phoneInput = document.getElementById('phone');
// const passwordInput = document.getElementById('password');
// const confirmPasswordInput = document.getElementById('confirm-password');
// const agreeCheckbox = document.querySelector('input[type="checkbox"]');
// const errorMessage = document.querySelector('.error-message');
// const submitButton = document.querySelector('button[type="submit"]');
// const inputList = document.querySelectorAll('input');
// const labelList = document.querySelectorAll('label');
// const inputs = document.querySelectorAll('.input-wrapper input');

// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Перевірка на заповненість всіх полів
//   if (
//     emailInput.value === '' ||
//     passwordInput.value === '') {
//     errorMessage.textContent =
//       'Будь ласка, заповніть всі поля.';
//     return;
//   }
//   // Перевірка на співпадіння паролів
// //   if (passwordInput.value !== users.password) {
// //     errorMessage.textContent = 'Паролі не співпадають. Будь ласка, перевірте введені дані.';
// //     confirmPasswordInput.style.backgroundColor = 'red';
// //     return;
// //   }
//   // Якщо всі поля заповнені та паролі співпадають
//   errorMessage.textContent = '';
//   alert('Ваш обліковий запис успішно створено!');
//   form.reset();
//   inputs.forEach(function (input) {
//     if (input.style.backgroundColor === 'green') {
//       input.style.backgroundColor = '';
//     }
//   });
//   labelList.forEach(function (label) {
//     label.classList.add('labelListOutFocus');
//   });
// });

// // Перевірка вводу даних в полях після першої невірної валідації
// inputs.forEach(function (input) {
//   input.addEventListener('input', function () {
//     inputs.forEach(function (i) {
//       i.style.backgroundColor = '';
//     });
//     errorMessage.textContent = '';
//   });
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
//   }
// });
// ///Перевірка input на наявність значення
// inputList.forEach(function (input, index) {
//   input.addEventListener('focus', function () {
//     if (input.value.trim() === '') {
//       labelList[index].classList.remove('labelListOutFocus');
//       labelList[index].classList.add('labelListOnFocus');
//       input.style.backgroundColor = 'white';
//     }
//   });

//   input.addEventListener('blur', function () {
//     if (input.value.trim() === '') {
//       labelList[index].classList.remove('labelListOnFocus');
//       labelList[index].classList.add('labelListOutFocus');
//       input.style.backgroundColor = '';
//     }
//   });
// });
// // Перевірка паролю
// function checkCredentials(username, password) {
//   const users = [
//     { username: 'user1', password: 'pass1' },
//     { username: 'user2', password: 'pass2' },
//     { username: 'user3', password: 'pass3' },
//   ];

//   for (let i = 0; i < users.length; i++) {
//     if (username === users[i].username && password === users[i].password) {
//       alert('Ви авторизовані');
//       return;
//     }
//   }
//   alert('Логін або Пароль не вірний');
// }


// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   if (checkCredentials(email, password)) {
//     errorMessage.textContent = '';
//     alert('Ви авторизовані');
//     form.reset();
//   } else {
//     errorMessage.textContent = 'Логін або Пароль не вірний';
//   }
// });
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.querySelector('.error-message');
const submitButton = document.querySelector('button[type="submit"]');
const inputs = document.querySelectorAll('.input-wrapper input');
const labelList = document.querySelectorAll('label');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (checkCredentials(email, password)) {
    errorMessage.textContent = '';
    alert('Ви авторизовані');
    form.reset();
      inputs.forEach(function (input) {
        if (input.style.backgroundColor) {
          input.style.backgroundColor = '';
        }
      });
      labelList.forEach(function (label) {
        label.classList.add('labelListOutFocus');
      });
  } else {
    errorMessage.textContent = 'Логін або Пароль не вірний';
  }
});

function checkCredentials(username, password) {
  const users = [
    { username: 'user1@gmail.com', password: 'pass1' },
    { username: 'user2@gmail.com', password: 'pass2' },
    { username: 'user3@gmail.com', password: 'pass3' },
  ];

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      return true;
    }
  }
  return false;
}

// emailInput.addEventListener('input', function () {
//   const value = emailInput.value;
//   const regex = /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
//   if (regex.test(value)) {
//     errorMessage.textContent = 'Email is correct!';
//     emailInput.style.backgroundColor = 'green';
//   } else {
//     errorMessage.textContent = 'Email is not correct!';
//     emailInput.style.backgroundColor = 'red';
//   }
// });

// passwordInput.addEventListener('input', function () {
//   const password = passwordInput.value;
//   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
//   if (regex.test(password)) {
//     passwordInput.style.backgroundColor = 'green';
//   } else {
//     passwordInput.style.backgroundColor = 'red';
//   }
// });

inputs.forEach(function (input, index) {
  input.addEventListener('focus', function () {
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
});