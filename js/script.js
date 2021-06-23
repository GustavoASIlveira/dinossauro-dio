const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');
let isJumping = false;
let position = 0;
let playerScore = 0;

const updateScore = ()=>{
	if(playerScore < 10){
		score.innerHTML =  'SCORE: 00' + playerScore;
		return;
	}
	
	if(playerScore < 100){
		score.innerHTML =  'SCORE: 0' + playerScore;
		return;
	}
	
	score.innerHTML =  'SCORE: ' +playerScore;
	return;
}

const keydownHandler = (e)=>{
	if(e.keyCode === 32){
		if(!isJumping){
			jump();
		}
	}
	
}

const jump = ()=>{
	isJumping = true;
	let speed = 20;
	
	let upInterval = setInterval(()=>{
		if(position >= 150){
			speed *= -1;
		}
		
		position += speed;
		dino.style.bottom = position + 'px';
	
		if(speed < 0 && position <= 0){
			position = 0;
			speed *= -1;
			clearInterval(upInterval);
			isJumping = false;
		}
	}, 20);
}

const createCactus = ()=>{
	const cactus = document.createElement('div');
	cactus.classList.add('cactus');
	let cactusPosition = 1000;
	let cactusSpeed = 10;
	cactus.style.left = cactusPosition + 'px';
	
	let randomTime = (Math.random() * 5000) + 1000;
	
	background.appendChild(cactus);
	
	let moveCactus = setInterval(()=>{
		cactusPosition -= cactusSpeed;
		cactus.style.left = cactusPosition + 'px';
		
		if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
			clearInterval(moveCactus);
			document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1>';
		}
		
		if(cactusPosition <= -60){
			clearInterval(moveCactus);
			background.removeChild(cactus);
			playerScore++;
			updateScore();
		}
	},20);
	
	setTimeout(createCactus, randomTime);
}

updateScore();
createCactus();

document.addEventListener('keydown', keydownHandler);
