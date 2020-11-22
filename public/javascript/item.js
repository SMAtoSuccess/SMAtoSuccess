async function addItemtoList(event) {
    event.preventDefault();
    console.log('Gonna add an item to the list!');
    
    // const list_id = document;
    const item_text = document.querySelector('input[name="item-name"]').value.trim();
    const item_url = document.querySelector('input[name="item-url"]').value.trim();
    // console.log(window.location);
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length
        
    ];

    // console.log(list_id);
    const response = await fetch(`/api/list/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            item_text,
            item_url,
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/api/list');
    } else {
        alert(response.statusText);
    }

    
    
};

document.querySelector('.item-form').addEventListener('submit', addItemtoList);