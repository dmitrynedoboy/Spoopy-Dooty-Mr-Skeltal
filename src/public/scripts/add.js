const { graveForm } = document.forms;

graveForm?.addEventListener('click', async (event) => {
  const { submit, close } = event.target.dataset;
  if (submit) {
    const formData = new FormData(graveForm);
    const data = Object.fromEntries(formData)
    const response = await fetch(`/card`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      window.location = '/'
    }
   } else if (close) {
     window.location = '/'
   }
});
