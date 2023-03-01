//Звичайна функція
// function propsCount(currentObject) {
//   return Object.keys(currentObject).length;
// }
// let mentor = {
//   course: "JS fundamental",
//   duration: 3,
//   direction: "web-development"
// };
// propsCount(mentor); // 3
// console.log('Кількість властивостей цього об’єкта: ', propsCount(mentor)); // 3
// Ось та ж сама функція propsCount з використанням стрілочної функції:

let mentor1 = {
  course: "JS fundamental",
  duration: 3,
  direction: "web-development"
};

const propsCount = currentObject => Object.keys(currentObject).length;
propsCount(mentor1); // 3
console.log('Кількість властивостей цього об’єкта: ', propsCount(mentor1)); // 3