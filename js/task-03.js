function sortNames(names) {
  const namesArray = names.split(','); // розділяємо рядок на масив імен за допомогою коми
  const trimmedNamesArray = namesArray.map(name => name.trim()); // використовуємо метод trim() для видалення пробілів з кожного імені
  const sortedNamesArray = trimmedNamesArray.sort(); // сортуємо масив імен за алфавітом
  const sortedNamesString = sortedNamesArray.join(', '); // з'єднуємо імена назад у рядок, використовуючи кому та пробіл

  return sortedNamesString;
}

const names = 'Alex,    Orysia, Misha,    Ira     , Paul';
const newNames = sortNames(names);
console.log(newNames); // 'Alex, Ira, Misha, Orysia, Paul'

//----Варіант Більш короткого запису--//

// function sortNames(names) {
//   const namesArray = names
//     .split(',')
//     .map(name => name.trim())
//     .sort()
//     .join(', '); 

//   return namesArray;
// }

// const names = 'Alex,    Orysia, Misha,    Ira     , Paul';
// const newNames = sortNames(names);
// console.log(newNames); // 'Alex, Ira, Misha, Orysia, Paul'