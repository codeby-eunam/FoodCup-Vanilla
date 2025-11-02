const images = [
    { src: 'practice_images/img1.jpg', name: '돈까스' },
    { src: 'practice_images/img2.jpg', name: '부대찌개' },
    { src: 'practice_images/img3.jpg', name: '덮밥' },
    { src: 'practice_images/img4.jpg', name: '쌀국수' },
    { src: 'practice_images/img5.jpg', name: '초밥' },
    { src: 'practice_images/img6.jpg', name: '파스타' },
    { src: 'practice_images/img7.jpg', name: '꼬치' },
    { src: 'practice_images/img8.jpg', name: '버섯' }
];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

let currentRound, nextRound, index, maxLength;

const startPage = document.getElementById("start-page");
// const pushImgPage = document.getElementById("push-img-page");
const gamePage = document.getElementById("game-page");
const resultPage = document.getElementById("result-page");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gostartBtn = document.getElementById("go-start-btn");
// const pushImgBtn = document.getElementById("push-img");

const leftImg = document.getElementById("left-img");
const rightImg = document.getElementById("right-img");
const leftWord = document.getElementById("left-word");
const rightWord = document.getElementById("right-word");
const roundInfo = document.getElementById("round-info");
const winImg = document.getElementById("win-img");
const winName = document.getElementById("win-word");

function start() {
	shuffle(images);
	// pushImgPage.style.display = "none";
	gamePage.style.display = "none";
	resultPage.style.display = "none";
}

function initGame() {
	startPage.style.display = "none";
	resultPage.style.display = "none";
	shuffle(images);
	currentRound = [...images];
	nextRound = [];
	index = 0;
	leftImg.style.display = "inline";
	leftWord.style.display = "inline";
	rightImg.style.display = "inline";
	rightWord.style.display = "inline";
	showPair();
}

function getRoundLabel(n) {
	if (n <= 2) return '결승전';
	if (n <= 4) return '4강';
	if (n <= 8) return '8강';
	if (n <= 16) return '16강';
	if (n <= 32) return '32강';
	return '64강';
}

function showPair() {
	if (index >= currentRound.length) {
		if (nextRound.length === 1) {
			showResult(nextRound[0]);
			return ;
		}
		currentRound = [...nextRound];
		nextRound = [];
		index = 0;
	}
	const matchNumber = getRoundLabel(currentRound.length);
	if (matchNumber === 2)
		roundInfo.textContent = `결승전`;
	else
		roundInfo.textContent = `이번 라운드 : ${matchNumber}`;

	leftImg.src = currentRound[index].src;
	leftWord.textContent = currentRound[index].name;
	rightImg.src = currentRound[index + 1].src;
	rightWord.textContent = currentRound[index + 1].name;
}

function showResult(winner) {
	gamePage.style.display = "none";
	resultPage.style.display = "flex";
	winImg.src = winner.src;
	winName.textContent = winner.name;
}

leftImg.addEventListener("click", () => {
	nextRound.push(currentRound[index]);
	index += 2;
	showPair();
});

rightImg.addEventListener("click", () => {
	nextRound.push(currentRound[index + 1]);
	index += 2;
	showPair();
});

startBtn.addEventListener("click", () => {
	const round = document.getElementById('round-select').value;

	switch(round) {
		case 'all':
			maxLength = images.length;
			break;
		case '64':
			maxLength = Math.min(64, images.length);
			break;
		case '32':
			maxLength = Math.min(32, images.length);
			break;
		case '16':
			maxLength = Math.min(16, images.length);
			break;
		case '8':
			maxLength = Math.min(8, images.length);
			break;
		default:
			maxLength = images.length;
	}

	currentRound = [...images].slice(0, maxLength);

	startPage.style.display = "none";
	gamePage.style.display = "flex";
	initGame();
});

// pushImgBtn.addEventListener("click", () => {
// 	startPage.style.display = "none";
// 	pushImgPage.style.display = "flex";
// });

restartBtn.addEventListener("click", ()=> {
	startPage.style.display = "none";
	gamePage.style.display = "flex";
	resultPage.style.display = "none";
	initGame();
});

gostartBtn.addEventListener("click", ()=> {
	startPage.style.display = "flex";
	gamePage.style.display = "none";
	resultPage.style.display = "none";
});

start();