'use strict';
const defaultColor = '#000000';
const defaultTiles = 16;
const defaultMode = 'pencil';
const defaultState = false;

let tiles = defaultTiles;
let color = defaultColor;
let mode = defaultMode;
let drawState = defaultState;

const board = document.querySelector('.board');
const slider = document.querySelector('.slider');
const pencil = document.querySelector('.pencil');
const erase = document.querySelector('.erase');
const clear = document.querySelector('.clear');
const gridCheckbox = document.querySelector('#grid-lines');
const tileIndicator = document.querySelector('.indicator');
const picker = document.querySelector('.picker');

picker.value = defaultColor;
slider.value = 0;
gridCheckbox.checked = true;

const updateTileNumber = () => {
	tiles = defaultTiles + parseInt(slider.value);
	reset();
};

const updateColor = (event, color) => {
	event.target.style.backgroundColor = color;
};

const changeMode = (newMode) => {
	mode = newMode;
	if (mode === 'eraser') {
		pencil.classList.toggle('active');
		erase.classList.toggle('active');
	} else {
		erase.classList.toggle('active');
		pencil.classList.toggle('active');
	}
};

const init = () => {
	tileIndicator.textContent = `${tiles}x${tiles}`;
	for (let i = 0; i < tiles; i++) {
		const row = document.createElement('div');
		row.classList.add('row');
		row.style.gridTemplateColumns = `repeat(${tiles}, 1fr)`;
		board.appendChild(row);

		for (let j = 0; j < tiles; j++) {
			const column = document.createElement('div');
			column.classList.add('column');
			column.addEventListener('click', () => {
				if (drawState) {
					drawState = false;
				} else {
					drawState = true;
				}
			});
			column.addEventListener('mouseenter', (e) => {
				if (drawState === true) {
					if (mode === 'pencil') {
						updateColor(e, color);
					} else if (mode === 'eraser') {
						updateColor(e, '#f1e8e6');
					}
				}
			});
			column.style.gridTemplateRows = `repeat(${tiles}, 1fr)`;
			row.appendChild(column);
		}
	}
};

const reset = () => {
	while (board.firstChild) {
		board.removeChild(board.firstChild);
	}
	init();
};

picker.addEventListener('change', (e) => (color = e.target.value));

erase.addEventListener('click', () => changeMode('eraser'));

pencil.addEventListener('click', () => changeMode('pencil'));

clear.addEventListener('click', () => {
	let columns = document.querySelectorAll('.column');
	for (let i of columns) {
		i.style.backgroundColor = '#f1e8e6';
	}
});

slider.addEventListener('change', updateTileNumber);

gridCheckbox.addEventListener('click', () => {
	let rows = document.querySelectorAll('.row');
	if (gridCheckbox.checked) {
		board.style.backgroundColor = '#000000';
		board.style.gap = '1px';
		for (let i of rows) {
			i.style.gap = '1px';
		}
	} else {
		board.style.backgroundColor = '#f1e8e6';
		board.style.gap = '0px';
		for (let i of rows) {
			i.style.gap = '0px';
		}
	}
});

reset();
