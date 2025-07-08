// Daftar item disusun per level untuk menambah variasi permainan
const levels = [
    [
        { emoji: '🛍️', type: 'reduce', text: 'Gunakan tas belanja kain' },
        { emoji: '💧', type: 'reduce', text: 'Matikan keran saat tidak digunakan' },
        { emoji: '♻️', type: 'recycle', text: 'Botol plastik' },
        { emoji: '📄', type: 'recycle', text: 'Kertas bekas' },
        { emoji: '🪣', type: 'reuse', text: 'Gunakan kembali ember' },
        { emoji: '🍱', type: 'reuse', text: 'Kotak makan' }
    ],
    [
        { emoji: '🥤', type: 'reduce', text: 'Hindari sedotan plastik' },
        { emoji: '🧴', type: 'reduce', text: 'Pilih kemasan isi ulang' },
        { emoji: '📦', type: 'reuse', text: 'Kotak karton' },
        { emoji: '👕', type: 'reuse', text: 'Jadikan kaos bekas lap' },
        { emoji: '⚙️', type: 'recycle', text: 'Kaleng bekas' },
        { emoji: '📰', type: 'recycle', text: 'Koran lama' }
    ],
    [
        { emoji: '🍃', type: 'reduce', text: 'Gunakan kompos alami' },
        { emoji: '💡', type: 'reduce', text: 'Matikan lampu saat tidak perlu' },
        { emoji: '🛍️', type: 'reuse', text: 'Kantong belanja plastik' },
        { emoji: '🧸', type: 'reuse', text: 'Mainan bekas' },
        { emoji: '🥫', type: 'recycle', text: 'Kaleng makanan' },
        { emoji: '🍶', type: 'recycle', text: 'Botol kaca' }
    ]
];

let currentLevel = 0;
let remaining = 0;

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
        const msg = document.getElementById('message');
        if (currentLevel < levels.length - 1) {
            msg.innerHTML = `Selamat! Level ${currentLevel + 1} selesai.<br><button id="next-level">Lanjut</button>`;
            msg.hidden = false;
            document.getElementById('next-level').addEventListener('click', () => {
                msg.hidden = true;
                nextLevel();
            });
        } else {
            msg.textContent = 'Selamat! Semua sampah berhasil dipilah.';
            msg.hidden = false;
        }
    }
}

function startLevel() {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    const levelItems = levels[currentLevel];
    remaining = levelItems.length;
    levelItems.forEach((data, index) => {
        const item = createItem(data);
        item.id = `item-${currentLevel}-${index}`;
        itemsContainer.appendChild(item);
    });
    document.getElementById('level-indicator').textContent = `Level ${currentLevel + 1} dari ${levels.length}`;
    document.getElementById('message').hidden = true;
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        startLevel();
    } else {
        document.getElementById('message').textContent = 'Selamat! Anda telah menyelesaikan semua level.';
        document.getElementById('message').hidden = false;
    }
}

function init() {
    startLevel();

    document.querySelectorAll('.bin').forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('dragleave', dragLeave);
        bin.addEventListener('drop', dropItem);
    });
}

window.addEventListener('DOMContentLoaded', init);
