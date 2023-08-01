const newFormHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#bleet-desc').value.trim();
  
    if (description) {
      const response = await fetch(`/api/bleets`, {
        method: 'POST',
        body: JSON.stringify({ username, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create bleet');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/bleets/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete bleet');
      }
    }
  };
  
  document
    .querySelector('.new-bleet-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.bleet-list')
    .addEventListener('click', delButtonHandler);
  