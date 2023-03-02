// 5) https://codepen.io/misha_klymenko/pen/abzLvqo
// - перебрати кожен елемент, і вибрати його data-anim значення
// - вибране значення додати як клас за допомогою classList до цього елемента.
// - перевірити чи застосувались анімації"
// - вибрати всі теги із класом cirkle
// -------------------------------------------------------------------------------------
//1 - вибрати всі теги із класом cirkle
const circles = document.querySelectorAll('.cirkle');

circles.forEach(circle => {
  //2 - перебрати кожен елемент, і вибрати його data-anim значення
    // const animationClass = circle.getAttribute('data-anim');
    // або
    const animationClass = circle.dataset.anim;
  //3 - вибране значення додати як клас за допомогою classList до цього елемента.
  circle.classList.add(animationClass);
  //4 - Перевірка, чи застосувались анімації
  console.log(circle.classList.contains(animationClass));
});
// або
//4 - Перевірка, чи застосувались анімації
// circles.forEach(circle => {
//   console.log(circle.classList.contains(circle.getAttribute('data-anim')));
// });