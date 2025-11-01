const images = [
    { src: 'practice_images/img1.jpg', name: '긴자료코' },
    { src: 'practice_images/img2.jpg', name: '부대찌개' },
    { src: 'practice_images/img3.jpg', name: '타이요' },
    { src: 'practice_images/img4.jpg', name: '쌀국수' },
    { src: 'practice_images/img5.jpg', name: '회.식' },
    { src: 'practice_images/img6.jpg', name: '퀴다' },
    { src: 'practice_images/img7.jpg', name: '꼬치' },
    { src: 'practice_images/img8.jpg', name: '버섯집' }
];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

let currentRound, nextRound, index;

const startPage = document.getElementById("start-page");
const pushImgPage = document.getElementById("push-img-page");
const gamePage = document.getElementById("game-page");
const resultPage = document.getElementById("result-page");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gostartBtn = document.getElementById("go-start-btn");
const pushImgBtn = document.getElementById("push-img");

const leftImg = document.getElementById("left-img");
const rightImg = document.getElementById("right-img");
const leftWord = document.getElementById("left-word");
const rightWord = document.getElementById("right-word");
const roundInfo = document.getElementById("round-info");
const winImg = document.getElementById("win-img");
const winName = document.getElementById("win-word");

function start() {
	shuffle(images);
	pushImgPage.style.display = "none";
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
	const matchNumber = currentRound.length;
	if (matchNumber === 2)
		roundInfo.textContent = `결승전`;
	else
		roundInfo.textContent = `이번 라운드 : ${matchNumber} 강`;

	leftImg.src = currentRound[index].src;
	leftWord.textContent = currentRound[index].name;
	rightImg.src = currentRound[index + 1].src;
	rightWord.textContent = currentRound[index + 1].name;
}

function showResult(winner) {
	gamePage.style.display = "none";
	resultPage.style.display = "block";
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
	startPage.style.display = "none";
	gamePage.style.display = "block";
	initGame();
});

pushImgBtn.addEventListener("click", () => {
	startPage.style.display = "none";
	pushImgPage.style.display = "block";
});

restartBtn.addEventListener("click", ()=> {
	startPage.style.display = "none";
	gamePage.style.display = "block";
	resultPage.style.display = "none";
	initGame();
});

gostartBtn.addEventListener("click", ()=> {
	startPage.style.display = "block";
	gamePage.style.display = "none";
	resultPage.style.display = "none";
});

start();