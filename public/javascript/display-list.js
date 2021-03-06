async function newFormHandler(event) {
    event.preventDefault();


    const list_name = document.querySelector('input[name="list-title"]').value.trim();

    const response = await fetch(`/api/list`, {
        method: 'get',
        body: JSON.stringify({
            list_name
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