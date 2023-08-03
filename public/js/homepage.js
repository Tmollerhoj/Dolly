const newFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#bleet-desc').value.trim();

    if (content) {
        const response = await fetch(`/api/bleets`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create bleet');
        }
    }
};

document
    .querySelector('.new-bleet-form')
    .addEventListener('submit', newFormHandler);