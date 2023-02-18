function countNumbers(arr) {
  let twoDigit = 0;
  let threeDigit = 0;
  let fourDigit = 0;

  for (let num of arr) {
    if (num >= 10 && num < 100) {
      twoDigit += 1;
    } else if (num >= 100 && num < 1000) {
      threeDigit += 1;
    } else if (num >= 1000 && num < 10000) {
      fourDigit += 1;
    }
  }

  return [twoDigit, threeDigit, fourDigit];
}
let arr = [1,2,55,3,100,333,9999];
let counts = countNumbers(arr);
console.log(counts);  // [1, 2, 1]