const field = document.getElementById('field');

const rows = 10;
const cols = 25;

const cellsCount = cols * rows;

let posX = 0;
let posY = 0;
let cells = [];
let objects = [];
let emptyCells = [];

// Создание поля
function createField() {
	field.innerHTML = '';
	field.style.gridTemplateColumns = 'repeat(' + cols + ', 40px)';
	field.innerHTML = '<div class="cell"></div>'.repeat(cellsCount);

	cells = [...field.children];

	emptyCells = [...cells.keys()];
	emptyCells.shift();
	emptyCells = emptyCells.sort(() => Math.random() - 0.5);
}

// Создание игрока
function createPlayer(sex) {
	let player = document.createElement('div');
	player.id = 'player';
	player.className = 'player ' + sex;
	player.style.backgroundImage = 'url("image/' + sex + '.png")';

	field.append(player);
}

// Создаём обьект
function createObject(img, repeat, type) {
	if (repeat > (cellsCount / 2)) return;

	while (repeat > 0) {
		let randomPos = emptyCells[0];
		emptyCells.shift();

		if (type === 'object') {
			cells[randomPos].classList.add(type);
			cells[randomPos].style.backgroundImage = 'url("image/' + img + '.png")';
		}

		if (type === 'enemy') {
			let x = Math.floor(randomPos / cols);
			let y = randomPos - (x * cols);

			let enemy = document.createElement('div');
			enemy.classList.add(type);
			enemy.style.top = x * 40 + 'px';
			enemy.style.left = y * 40 + 'px';
			enemy.style.backgroundImage = 'url("image/' + img + '.png")';

			enemy.addEventListener('click', attackEnemy);

			let createHpBar = document.createElement('div');
			createHpBar.style.setProperty('--hp', '100%');
			enemy.append(createHpBar);

			field.append(enemy);
		}
		repeat--;
	}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

createField();
createPlayer('woman');
createObject('tree', 10, 'object');
createObject('rat', 2, 'enemy');

const player = document.getElementById('player');