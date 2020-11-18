async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="list-title"]').value.trim();

    const response = await fetch(`/api/list`, {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-list-form').addEventListener('submit', newFormHandler);