const cardDeleteContainer = document.querySelector('.container div.container');

cardDeleteContainer?.addEventListener('click', async (event) => {
  const { del } = event.target.dataset;
  if (del) {
    const response = await fetch(`/card/${del}`, {
      method: 'DELETE',
    });
    const result = await response.text();
    if (response.ok) {
      const card = document.getElementById(`card-id-${del}`);
      card.remove();
    }
   }
});
