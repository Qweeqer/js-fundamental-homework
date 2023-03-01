// 'use strict';

// <--------1------->
function checkCredentials(username, password) {
  const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'user3', password: 'pass3' },
  ];

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      console.log('Ви авторизовані');
      return;
    }
  }
  console.log('Логін або Пароль не вірний');
}

console.log(checkCredentials('user2', 'pass1'));
console.log(checkCredentials('user1', 'pass1'));


