class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  showFullName() {
    console.log(`${this.surname} ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, surname, year) {
    super(name, surname);
    this.year = year;
  }
showFullName(middleName) {
    console.log(`${this.surname} ${this.name} ${middleName}`);
  }
  

  showCourse() {
    const currentYear = new Date().getFullYear();
    const course = currentYear - this.year + 1;
    return course >= 1 && course <= 6 ? course : 'Out of course range';
  }
}

const stud1 = new Student('Petro', 'Petrenko', 2019);
console.log(stud1.showFullName('Petrovych')); // Petrenko Petro Petrovych
console.log('Current course: ' + stud1.showCourse()); // Current course: 5
const stud2 = new Student('Semen', 'Horovenko', 2016);
console.log(stud2.showFullName('Petrovych')); // Petrenko Petro Petrovych
console.log('Current course: ' + stud2.showCourse()); // Current course: 5