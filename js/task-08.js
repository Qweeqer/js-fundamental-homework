
function assignIndexNumber(arr) {
  const sortedArr = [];
  const oddArr = [];
  const evenArr = [];
// поділ чисел за парністю та сортування масиву
  arr
    .sort((a, b) => a - b)
    .forEach(item => {
      item % 2 ? oddArr.push(item) : evenArr.push(item);
    });
  const maxLength = oddArr.length > evenArr.length ? oddArr.length * 2 - 1: evenArr.length * 2 - 1;
  for (let i = 0; i < maxLength; i++) {
    // перевірка наявності елементів у масивах і прирівнювання індексу до числа
    if (i % 2) {
      let oddValue = oddArr.shift();
      sortedArr[i] = oddValue === undefined ? null : oddValue;
    } else {
      let evenValue = evenArr.shift();
      sortedArr[i] = evenValue === undefined ? null : evenValue;
    }
  }
  return sortedArr;
}
let arr = [5, 2, 4, 7, 0, 8, 9, 10];
let arr2 = assignIndexNumber(arr);
console.log(arr2); // [0, 5, 2, 7, 4, 9, 8, null, 10]
console.table(arr2);




