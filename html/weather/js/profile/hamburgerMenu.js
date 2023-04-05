const menuButton = document.getElementById('menu-icon');
const menuItems = document.querySelectorAll('.opened');
const userInfo = document.getElementById('UserInfo');

const homeButton = document.querySelector('#home-button');
const selectedButton = document.querySelector('#selected-button');
const profileButton = document.querySelector('#profile-button');
const logoutButton = document.querySelector('#logout-button');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('closed');
  menuItems.forEach(item => item.classList.toggle('opened'));
  homeButton.style.display = menuButton.classList.contains('closed') ? 'flex' : 'none';
  selectedButton.style.display = menuButton.classList.contains('closed') ? 'flex' : 'none';
  profileButton.style.display = menuButton.classList.contains('closed') ? 'flex' : 'none';
  logoutButton.style.display = menuButton.classList.contains('closed') ? 'flex' : 'none';
});
