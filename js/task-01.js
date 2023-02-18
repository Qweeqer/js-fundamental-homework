
const arr = [5,3,4,5,6,7,3,1,1,2,2,3,5,6,4,7,39,8,5,44,555];
// console.log(arr2) ; // [5,3,4,6,7]
function compact(arr) {
  const uniqueValues = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueValues.includes(arr[i])) {
      uniqueValues.push(arr[i]);
    }
  }
  
  return uniqueValues;
}
const uniqueValues = compact(arr);

console.log('uniqueValues', uniqueValues);