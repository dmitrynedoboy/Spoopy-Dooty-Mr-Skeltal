const { signUp } = document.forms;

signUp?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { action, method } = event.target;
  const formData = new FormData(signUp);
  const signUpData = Object.fromEntries(formData);
  const signUpResponse = await fetch(action, {
    method,
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(signUpData)
  })
  const signUpResult = await signUpResponse.text();
  if (signUpResult === 'ok') {
    window.location = '/';
  } else {
    const buttonContainer = document.querySelector('.btn-container');
    buttonContainer.insertAdjacentHTML('beforebegin', `<div class="container error">${signUpResult}</div>`)
    buttonContainer.firstElementChild.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      document.querySelector('.container .error').remove();
      buttonContainer.firstElementChild.removeAttribute('disabled');
    }, 3000)

  }
})

