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
    Notiflix.Report.success('Success', 'Great! You are successfully authorized', 'OK');
    // alert('Ви авторизовані');
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
    Notiflix.Report.failure('Failure', 'The login or password is incorrect!', 'OK');
    // errorMessage.textContent = 'Логін або Пароль не вірний';
    form.reset();
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
