async function addItemtoList(event) {
    event.preventDefault();
    console.log('Gonna add an item to the list!');
    
    // const list_id = document;
    const item_text = document.querySelector('input[name="item-name"]').value.trim();
    const item_url = document.querySelector('input[name="item-url"]').value.trim();
    const list_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        
    ];

    // console.log(id);
    const response = await fetch(`/api/item/${list_id}`, {
        method: 'POST',
        body: JSON.stringify({
            item_text,
            item_url,
            list_id
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