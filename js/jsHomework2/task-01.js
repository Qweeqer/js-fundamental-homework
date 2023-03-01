// Створюємо об'єкт з 5 полями
const person = {
  firstName: 'John',
  lastName: 'Smith',
  age: 30,
  email: 'johnsmith@example.com',
  occupation: 'Software Engineer',
};
// варіант 2 
// Створюємо конструктор об'єкта з іменем Personfunc, який приймає 5 аргументів для створення об'єкта. 
// Далі ми створюємо змінну personObj, яка містить новий об'єкт типу Personfunc з переданими значеннями аргументів.
function Personfunc(firstName, lastName, age, email, phone) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.email = email;
  this.phone = phone;
}
const personObj = new Personfunc('Donald', 'Duck', 70, 'donaldduck@example.com', '123-456-7890');

// Функція showProps, що виводить список властивостей та масив значень об'єкта
function showProps(obj) {
  const propList = Object.keys(obj); // Отримуємо список властивостей
  const valueList = Object.values(obj); // Отримуємо масив значень властивостей

  console.log("Список властивостей об'єкта: ", propList);
  // console.log(propList);

  console.log("Масив значень властивостей об'єкта: ", valueList);
  // console.log(valueList);
}

// Викликаємо функцію showProps з об'єктом person
showProps(person);
showProps(personObj);
