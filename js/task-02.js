function createArray(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

const arr = createArray(2, 9);
console.log(arr); // [2,3,4,5,6,7,8,9]
