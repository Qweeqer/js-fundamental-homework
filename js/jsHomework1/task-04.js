let arr = [
  { name: 'Misha Klym', age: 2 },
  { name: 'Sam Winchester', age: 5 },
  { name: 'Jordan Peterson', age: 43 },
  { name: 'John Wayne', age: 17 },
  { name: 'Stan Lee', age: 22 },
  { name: 'John Smith', age: 40 },
  { name: 'John Young', age: 11 },
  { name: 'Jasmyn Rock', age: 32 },
  { name: 'Sara Conor', age: 23 },
  { name: 'Amelia Arhard', age: 16 },
];

let newArray = arr.filter(obj => obj.age > 18);

console.log(newArray);
// [ { name: 'Stan Lee', age: 22 },
//   { name: 'John Smith', age: '40' },
//   { name: 'Jasmyn Rock', age: '32' },
//   { name: 'Sara Conor', age: '23' }]
