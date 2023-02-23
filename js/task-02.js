function createArray(start, end) {
  const arr = [];
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
  } else {
    for (let i = start; i >= end; i--) {
      arr.push(i);
    }
  }
  return arr;
}

const arr = createArray(2, 9);
console.log(arr); // [2,3,4,5,6,7,8,9];
const arr2 = createArray(9, 2);
console.log(arr2); // [9,8,7,6,5,4,3,2];
