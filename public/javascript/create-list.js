async function newFormHandler(event) {
    event.preventDefault();


    const title = document.querySelector('input[name="list-title"]').value;
    console.log(title)
    const response = await fetch(`/api/list`, {
        method: 'post',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response)
    if (response.ok) {
        console.log('hello again')
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-list-form').addEventListener('submit', newFormHandler);