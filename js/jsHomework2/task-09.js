function getFullName(firstName, lastName, transformFunc = null) {
  let fullName = `${firstName.trim()} ${lastName.trim()}`;

  fullName = fullName.replace(/\s+/g, ' ');

  if (transformFunc) {
    switch (transformFunc) {
      case 'uppercase':
        fullName = fullName.toUpperCase();
        break;
      case 'lowercase':
        fullName = fullName.toLowerCase();
        break;
      case 'capitalize':
        const capitalizeWord = word => {
          return word
            .trim()
            .split(' ')
            .map(wordName => wordName.charAt(0).toUpperCase() + wordName.slice(1).toLowerCase())
            .join(' ');
        };
        firstName = capitalizeWord(firstName);
        lastName = capitalizeWord(lastName);
        fullName = `${firstName} ${lastName}`;
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
console.log(getFullName('   JOHN  ', '   SMITH  ', 'capitalize')); // "John Smith"
console.log(getFullName('   MICHAEL  ', '   JORDAN  ', 'capitalize')); // "Michael Jordan"
console.log(getFullName('   A  ', '   B  ', 'capitalize')); // "A B"
console.log(getFullName('   john  ', '   smith  ', 'capitalize')); // "John Smith"
console.log(getFullName(' jOhN ', ' sMiTH ', 'capitalize')); // "John Smith"
