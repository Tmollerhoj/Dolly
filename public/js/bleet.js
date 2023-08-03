const bleetId = document.querySelector('.btn').getAttribute("data-id");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-text').value.trim();
  
 console.log(content)
  //takes the title text of the post from the user-submitted front end and submits it through a POST fetch request. 
  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content, bleet_id:bleetId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
//reloads the page if the response to the req passes. 
    if (response.ok) {
      document.location.replace(`/bleet/${bleetId}`);
    } else {
      alert('Failed to add a comment');
    }
  }
};

document.querySelector('#comment-form');
document.addEventListener('submit', commentFormHandler);