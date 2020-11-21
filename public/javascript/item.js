async function addItemtoList(event) {
    event.preventDefault();
    console.log('Gonna add an item to the list!');
    
    const item_text = document.querySelector('input[name="item-name"]').value.trim();
    const item_url = document.querySelector('input[name="item-url"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        
    ];

    console.log(id);
    const response = await fetch(`/api/list/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            item_text,
            item_url,
            // list_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

    
    
};

document.querySelector('.item-form').addEventListener('submit', addItemtoList);