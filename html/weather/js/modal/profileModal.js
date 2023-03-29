import { getCurrent } from '../auth/auth.js';
// ПРОФІЛЬ МОДАЛ
const profileButton = document.getElementById('profile-button');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const userInfo = document.getElementById('user-info');

profileButton.addEventListener('click', async () => {
  const currentUser = await getCurrent();
  if (currentUser) {
    userInfo.innerHTML = `
      <p>Ім'я: ${currentUser.name}</p>
      <p>Email: ${currentUser.email}</p>
    `;
    profileModal.style.display = 'block';
  } else {
    alert('Будь ласка, увійдіть, щоб побачити інформацію про користувача');
  }
});

closeProfileModal.addEventListener('click', () => {
  profileModal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target === profileModal) {
    profileModal.style.display = 'none';
  }
});
