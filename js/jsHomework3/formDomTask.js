// реалізувати вивід даних із полів при кліку на кнопку "Надіслати" в поле outBlock
// https://codepen.io/qweeqer/pen/OJoxXvX
const submitBtn = document.querySelector('.btn');
const outBlock = document.querySelector('.out');

submitBtn.addEventListener('click', function () {
  const inputFields = document.querySelectorAll('.arr');
  let output = '';

  inputFields.forEach(function (field) {
    const fieldName = field.getAttribute('data-form');
    const fieldValue = field.value;

    output += `<p><strong>${fieldName}:</strong> ${fieldValue}</p>`;
  });

  outBlock.innerHTML = output;
});
