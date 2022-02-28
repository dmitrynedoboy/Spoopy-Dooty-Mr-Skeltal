const cardContainer = document.querySelector('.container div.container div.card-container');

cardContainer?.addEventListener('click', async (event) => {
  const { del } = event.target.dataset;
  if (del) {
    const response = await fetch(`/card/${del}`, {
      method: 'DELETE',
    });
    const result = await response.text();
    if (response.ok) {
      const card = document.closest(`.card`)
      card.remove()
    }
  }
});
