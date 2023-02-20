function getFullName(firstName, lastName, transformFunc = null) {
  let fullName = `${firstName} ${lastName}`.trim(); // видаляє пробіли з початку і кінця рядка

  fullName = fullName.replace(/\s+/g, ' '); // замінює послідовності пробілів на один пробіл

  if (transformFunc) {
    switch (transformFunc) {
      case 'uppercase':
        fullName = fullName.toUpperCase();
        break;
      case 'lowercase':
        fullName = fullName.toLowerCase();
        break;
      case 'capitalize':
        fullName = fullName.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
        break;
      default:
        console.log('Invalid transform function');
    }
  }

  return fullName;
}


let fullName = getFullName('John', 'Gippercase', 'uppercase');
console.log(fullName);
console.log(getFullName('John', 'Smith', 'uppercase')); // "JOHN Smith"
console.log(getFullName('John', 'Smith', 'lowercase')); // "john smith"
console.log(getFullName('john', 'smith', 'capitalize')); // "John Smith"
console.log(getFullName('   John  ', '   Smith  ', 'capitalize')); // "John Smith"