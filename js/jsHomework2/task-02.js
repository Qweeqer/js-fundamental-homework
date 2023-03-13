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
// ..Варіант 2..........
let mentor2 = {
  course: "JS fundamental",
  duration: 3,
  direction: "web-development"
};

const propsCount = currentObject => Object.keys(currentObject).length;
propsCount(mentor2); // 3
console.log('Кількість властивостей цього об’єкта: ', propsCount(mentor2)); // 3
// ..Варіант 3..
let mentor3 = {
  course: "JS fundamental",
  duration: 3,
  direction: "web-development",
  propsCount: function () {
    return Object.keys(this).length;
  }
}

console.log('Кількість властивостей цього об’єкта разом з методами: ', mentor3.propsCount()); // 3
// Варіант 4
let mentor4 = {
  course: "JS fundamental",
  duration: 3,
  direction: "web-development",
  propsCount: function() {
    let count = 0;
    for (let key in this) {
      if (typeof this[key] !== 'function') {
        count++;
      }
    }
    return count;
  }
};

console.log('Кількість властивостей цього об’єкта без методів: ', mentor4.propsCount()); // 3

