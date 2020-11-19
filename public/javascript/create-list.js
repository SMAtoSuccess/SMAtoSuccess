async function newFormHandler(event) {
    event.preventDefault();

    const list_name = document.querySelector('input[name="list-title"]').value;


    const response = await fetch(`/api/list`, {
        method: 'POST',
        body: JSON.stringify({
            list_name,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/my-list');
    } else {
        alert(response.statusText);
    }

}
    


document.querySelector('.new-list-form').addEventListener('submit', newFormHandler);