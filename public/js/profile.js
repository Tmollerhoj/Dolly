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
  
  
  const deleteBtns = document.querySelectorAll('.delete-btn')
  for(let i= 0; i<deleteBtns.length; i++){
    deleteBtns[i].addEventListener('click', delButtonHandler)
  }
  
