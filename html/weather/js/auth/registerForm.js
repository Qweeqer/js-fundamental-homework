import { getSignUp, getCurrent, handleLogout, showUserInfo } from './auth.js';
import { register } from '../modal/modalManager.js';
import { errorMessage, validateForm, updateSubmitButtonState } from './validation.js';

// *******************registerForm*************************************
export const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async event => {
    event.preventDefault();

    const { firstName, email, password, confirmPassword } = event.target.elements;
    // Валідація

    if (!validateForm()) {
      errorMessage.textContent = 'Please fill in all fields and agree to the Terms of Use.';
      return;
    } else {
      errorMessage.textContent = '';
      alert('Thank you! Your account has been successfully created!');
      updateSubmitButtonState();
    }
    updateSubmitButtonState();
    /////
    try {
      await getSignUp({
        name: firstName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      setTimeout(async () => {
        const user = await getCurrent();
        console.log('user', user);
        if (user) {
          // const userContainer = document.getElementById('UserInfo');
          // userContainer.innerHTML = `<p>Ім’я користувача: ${user.name}</p> <p>Email: ${user.email}</p>`;

          const logoutButton = document.createElement('button');
          logoutButton.id = 'logout-button';
          logoutButton.textContent = 'Log Out';
          // userContainer.appendChild(logoutButton);
          logoutButton.addEventListener('click', handleLogout);

          register.style.display = 'none';
          dark.style.display = 'none';
          showUserInfo();
          window.location.href = 'profile.html';
        } else {
          throw new Error('User is null');
        }
      }, 500);
    } catch (error) {
      console.error(error);
      alert('Registration Error: ' + error);
    }
  });
}
// *******************END********************************************
