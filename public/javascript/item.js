async function addItemtoList(event) {
    event.preventDefault();
    console.log('Gonna add an item to the list!');
    
    // const list_id = document;
    const item_text = document.querySelector('input[name="item-name"]').value.trim();
    const item_url = document.querySelector('input[name="item-url"]').value.trim();
    // console.log(window.location);
    console.log(window.location.href.split('?')[1]);
    const id = window.location.href.split('?')[1];

    console.log(id);
    const response = await fetch(`/api/item/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            item_text,
            item_url,
            list_id : id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/api/list`);
    } else {
        alert(response.statusText);
    }

    
    
};

document.querySelector('.item-form').addEventListener('submit', addItemtoList);