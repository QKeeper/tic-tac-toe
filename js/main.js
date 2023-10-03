const game = document.querySelector(`.game`);
const res = document.querySelector(`.res`);
const btnGame = document.querySelector(`.new-game`);
const fields = document.querySelectorAll(`.field`);
let stepCross = true;
let count = 0;

const circle = `<svg class="circle">
<circle r="40" cx="58" cy="58" stroke="#007bff" stroke-width="15" fill="none"></circle>
</svg>`

const cross = `<svg class="cross">
<line class="first" x1="20" y1="20" x2="95" y2="95" stroke="#dc3545" stroke-width="15" stroke-linecap="round"></line>
<line class="second" x1="20" y1="95" x2="95" y2="20" stroke="#dc3545" stroke-width="15" stroke-linecap="round"></line>
</svg>`

game.addEventListener(`click`, init);
btnGame.addEventListener(`click`, newGame);

function doStep(target) {
	target.innerHTML = stepCross ? cross : circle;
	target.classList.add(stepCross ? `x` : `o`);
}

function init(e) {
	const curField = e.target.closest(`.field`);
	if ([`x`, `o`].every(el => !curField.classList.contains(el))) {
		doStep(e.target);
		stepCross = !stepCross;
		count++;
		win();
	}
}

function newGame() {
	res.style.display = `none`;
	stepCross = true;
	count = 0;
	Array.from(fields).forEach(el => {
		el.innerHTML = ``
		el.classList.remove(`x`, `o`, `active`);
	});
	game.addEventListener(`click`, init);
}

function win() {
	const comb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < comb.length; i++) {
		const cur = comb[i];
		const curFields = [fields[cur[0]], fields[cur[1]], fields[cur[2]]];

		if (curFields.every(el => el.classList.contains(`x`)))
			setResult(`Крестики победили`, curFields);
		else if (curFields.every(el => el.classList.contains(`o`)))
			setResult(`Нолики победили`, curFields);
		else if (count === 9)
			setResult(`Ничья 🤔`);
	}
}

function setResult(result, cells) {
	res.style.display = `flex`;
	res.querySelector(`p`).textContent = result;
	game.removeEventListener(`click`, init);
	if (cells)
		cells.forEach(field => field.classList.add(`active`));
}