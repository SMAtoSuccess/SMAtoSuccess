async function addItemtoList(event) {
    event.preventDefault();
    console.log('Gonna add an item to the list!');
};

document.querySelector('.item-form').addEventListener('submit', addItemtoList);