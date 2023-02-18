// let arr = [5, 6, 7, 8, [1, 2 ], 9];
// let arr2 = ["H", "I", "J", "K", "L"];
// let arr3 = [...arr2, ...arr];
// let arr4 = arr2.concat(arr);
// console.log(arr3, arr4);

const numbers = [5, 10, 15, 20, 25];

// Класичний for
for (let i = 0; i < numbers.length; i += 1) {
  console.log(`Індекс ${i}, значення ${numbers[i]}`);
}
// Метод перебирання forEach
numbers.forEach(function (number, index) {
  console.log(`Індекс ${index}, значення ${number}`);
});