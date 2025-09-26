const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function formatFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const group = input.parentElement;
  group.className = 'form-item error';
  const small = group.querySelector('small');
  small.innerText = message;
}

function showSuccess(input, message) {
  const group = input.parentElement;
  group.className = 'form-item success';
  const small = group.querySelector('small');
  if (message) small.innerText = message;
}

function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input, '');
    }
  });
  return isValid;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters.`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters.`
    );
    return false;
  }
  showSuccess(input, '');
  return true;
}

function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input, '');
    return true;
  }
  showError(input, 'Email is not valid');
  return false;
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
    return false;
  }
  showSuccess(input2, '');
  return true;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);
  let isFormValid = isRequiredValid;
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);
    isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordsMatch;
  }

  if (isFormValid) {
    alert('Registration successful!');
    form.reset();
    document.querySelectorAll('.form-item').forEach((group) => {
      group.className = 'form-item';
      const small = group.querySelector('small');
      if (small) small.innerText = '';
    });
  }
});


