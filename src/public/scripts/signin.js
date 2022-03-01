const { signIn } = document.forms;

signIn?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { action, method } = event.target;
  const formData = new FormData(signIn);
  const signInData = Object.fromEntries(formData);
  const signInResponse = await fetch(action, {
    method,
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(signInData)
  })
  const signInResult = await signInResponse.text();
  console.log(signInResult);
  if (signInResult === 'ok') {
    window.location = '/';
  } else {
    const buttonContainer = document.querySelector('.btn-container');
    buttonContainer.insertAdjacentHTML('beforebegin', `<div class="container error">${signInResult}</div>`)
    buttonContainer.firstElementChild.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      document.querySelector('.container .error').remove();
      buttonContainer.firstElementChild.removeAttribute('disabled');
    }, 3000)

  }
})
