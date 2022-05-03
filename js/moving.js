window.addEventListener('keydown', (e) => {
	let keyCode = e.which;
	let tempX = 0;
	let tempY = 0;

	switch (keyCode) {
		case 87 : // W
			tempX--;
			break;
		case 65 : // A
			tempY--;
			break;
		case 83 : // S
			tempX++;
			break;
		case 68 : // D
			tempY++;
			break;
		default :
			return;
			break;
	}

	if (!isEnemy(posX + tempX, posY + tempY)) {
		//console.log('Enemy');
	}

	// Проверяем если не выходим за пределами карты или не наступаем на обьект
	if (moveIsValid(posX + tempX, posY + tempY) && !isObject(posX + tempX, posY + tempY)) {
		posX += tempX;
		posY += tempY;

		move();
	}
});

// Проверяем если не выходим за пределами карты
function moveIsValid(x, y) {
	return x >= 0 && x < rows && y >= 0 && y < cols;
}

// Проверяем если не наступаем на обьект
function isObject(x, y) {
	let nextCell = cells[x * cols + y];
	return nextCell.classList.contains('object');
}

// Проверяем если не наступаем на врага
function isEnemy(x, y) {

}

// Ходим
function move() {
	player.style.top = posX * 40 + 'px';
	player.style.left = posY * 40 + 'px';
}

function attackEnemy() {
	let prevEnemyTarget = document.querySelector('.target');

	// Удаляем обводку у предыдущего врага
	if (prevEnemyTarget && !this.classList.contains('target')) {
		prevEnemyTarget.classList.remove('target');
	}

	if (!this.classList.contains('target')) {
		this.classList.add('target');
		return;
	}

	// Позиция противника по Оси x и y
	let enemyPosX = this.style.top.replaceAll('px', '') / 40;
	let enemyPosY = this.style.left.replaceAll('px', '') / 40;

	// Позиция игрока по Оси x и y
	bulletPosX = Math.abs((posX + 1) * 40 - 20) + 'px';
	bulletPosY = Math.abs((posY + 1) * 40 - 20) + 'px';

	// Угол на котором враг находиться от игрока
	let angle = Math.atan2(enemyPosX - posX, enemyPosY - posY) * 180 / Math.PI + 90;

	shotEnemy(bulletPosX, bulletPosY, angle, this.style.left, this.style.top);

	let enemyHp = getComputedStyle(this.children[0]).getPropertyValue('--hp').replaceAll('%', '');

	// Наносим рандомный урон от min до max
	enemyHp -= getRandomNumber(15, 25);

	if (enemyHp <= 0) {
		this.remove();
	}
	this.children[0].style.setProperty('--hp', enemyHp + '%');
	
	// Дистанция до врага
	// let distanceToEnemy = Math.sqrt(Math.pow(posX - enemyPosX, 2) + Math.pow(posY - enemyPosY, 2));
	// bullet.style.setProperty('--width', distanceToEnemy * 40 - 20 + 'px');
}

function shotEnemy(fromX, fromY, angle, toX, toY) {
	let bullet = document.createElement('div');
	bullet.classList = 'bullet bullet-shot';

	bullet.style.left = fromX;
	bullet.style.top  = fromY;

	bullet.style.transform = 'rotate(' + angle + 'deg) translateY(-50%) translateX(-50%)';

	bullet.style.setProperty('--toX', toX);
	bullet.style.setProperty('--toY', toY);

	field.append(bullet);

	setTimeout(() => {
		bullet.remove();
	}, 500);
}