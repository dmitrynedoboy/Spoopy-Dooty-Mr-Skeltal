const cardEditContainer = document.querySelector('.container div.container');
const html = document.documentElement;

cardEditContainer?.addEventListener('click', async (event) => {
  const { edit } = event.target.dataset;
  if (edit) {
    const response = await fetch(`/card/${edit}`, {
      method: 'PUT',
    });
    const result = await response.text();
    if (response.ok) {
      cardEditContainer.insertAdjacentHTML('beforebegin', result);
      html.classList.add("modal-opened");
    }
    const modal = document.querySelector('.modal')
    modal.addEventListener('click', async (secEvent) => {
      const { submit, close } = secEvent.target.dataset;
      if (close) {
        html.classList.remove("modal-opened");
        modal.remove();
      } else if (submit) {
        const { graveForm } = document.forms;
        const formData = new FormData(graveForm);
        const data = Object.fromEntries(formData)
        const response = await fetch(`/card/${edit}`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          html.classList.remove("modal-opened");
          modal.remove();
        }
        const result = await response.json()
        const card = document.getElementById(`card-id-${edit}`)
        const cardTitle = card.querySelector('.grave-title')
        const cardImg = card.querySelector('.grave-pic')
        cardTitle.innerHTML = result.title;
        cardImg.src = result.img;
      }
    })
  }
});
