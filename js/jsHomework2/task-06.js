function groupByType(arr) {
  let numbersArr = [];
  let stringsArr = [];

  for (let element of arr) {
    if (typeof element === 'number') {
      numbersArr.push(element);
    } else if (typeof element === 'string') {
      stringsArr.push(element);
    } else if (Array.isArray(element)) {
      let subArrays = groupByType(element);
      numbersArr = numbersArr.concat(subArrays[0]);
      stringsArr = stringsArr.concat(subArrays[1]);
    }
  }

  return [numbersArr, stringsArr];
}

let arr = [5, 'Limit', 12, 'a', '3', 99, 2, [2, 4, 3, '33', 'a', 'text'], 'strong', 'broun'];
let arrNew = groupByType(arr);
console.log(arrNew);
// [ [ 5, 12, 99, 2, 2, 4, 3 ], [ 'Limit', 'a', '3', '33', 'a', 'text', 'strong', 'broun' ] ]

