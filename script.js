const itemsData = [
    { emoji: '🛍️', type: 'reduce', text: 'Gunakan tas belanja kain' },
    { emoji: '💧', type: 'reduce', text: 'Matikan keran saat tidak digunakan' },
    { emoji: '♻️', type: 'recycle', text: 'Botol plastik' },
    { emoji: '📄', type: 'recycle', text: 'Kertas bekas' },
    { emoji: '🪣', type: 'reuse', text: 'Gunakan kembali ember' },
    { emoji: '🍱', type: 'reuse', text: 'Kotak makan' }
];

let remaining = itemsData.length;

function createItem({ emoji, type, text }) {
    const div = document.createElement('div');
    div.className = 'item';
    div.draggable = true;
    div.dataset.type = type;
    div.textContent = `${emoji} ${text}`;
    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragend', dragEnd);
    return div;
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.type);
    event.dataTransfer.setData('text/item', event.target.id);
    event.target.classList.add('dragging');
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

function dragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

function dropItem(event) {
    event.preventDefault();
    const type = event.dataTransfer.getData('text/plain');
    const itemType = type;
    const binType = event.currentTarget.dataset.type;

    if (itemType === binType) {
        const id = event.dataTransfer.getData('text/item');
        const element = document.getElementById(id);
        event.currentTarget.appendChild(element);
        element.draggable = false;
        remaining--;
        checkWin();
    }
    event.currentTarget.classList.remove('drag-over');
}

function checkWin() {
    if (remaining === 0) {
        document.getElementById('message').textContent = 'Selamat! Semua sampah berhasil dipilah.';
        document.getElementById('message').hidden = false;
    }
}

function init() {
    const itemsContainer = document.getElementById('items');
    itemsData.forEach((data, index) => {
        const item = createItem(data);
        item.id = `item-${index}`;
        itemsContainer.appendChild(item);
    });

    document.querySelectorAll('.bin').forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('dragleave', dragLeave);
        bin.addEventListener('drop', dropItem);
    });
}

window.addEventListener('DOMContentLoaded', init);
