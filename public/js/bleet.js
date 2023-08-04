const bleetId = document.querySelector('.btn').getAttribute("data-id");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-text').value.trim();
  
 console.log(content)
  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content, bleet_id:bleetId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/bleet/${bleetId}`);
    } else {
      alert('Failed to add a comment');
    }
  }
};

document.querySelector('#comment-form');
document.addEventListener('submit', commentFormHandler);