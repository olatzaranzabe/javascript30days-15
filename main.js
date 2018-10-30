'use strict';

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    }

    items.push(item);
    console.table(items)
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;

    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    console.log(e.target);
    const el = e.target;
    const index  = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', Json.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);

// Delegamos responsabilidad de los eventos a los padres
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);