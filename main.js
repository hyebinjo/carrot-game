function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const playBtn = document.querySelector('.playBtn');
const bugs = document.querySelectorAll('.bug');
const min = document.querySelector('.time__min');
const sec = document.querySelector('.time__sec');
const replaySection = document.querySelector('.replay-section');
const replayBtn = document.querySelector('.replayBtn');
const carrotSection = document.querySelector('.carrot-section');
const playground = document.querySelector('.playground');
const numOfLeft = document.querySelector('.numofleft');
const message = document.querySelector('.message');

const bgm = new Audio('sound/bg.mp3');
const carrot_pull = new Audio('sound/carrot_pull.mp3');
const bug_pull = new Audio('sound/bug_pull.mp3');
const game_win = new Audio('sound/game_win.mp3');
const alert = new Audio('sound/alert.wav');

function gamestart() {
    replaySection.style.display = `none`;
    removeCarrot();
    creatCarrot();
    arrangeBug();
    const carrots = document.querySelectorAll('.carrot');
    numOfLeft.textContent = `${carrots.length}`;
}

function removeCarrot() {
    while(carrotSection.firstChild) {
        carrotSection.removeChild(carrotSection.firstChild);
    }
}

function creatCarrot() {
    for(let i=0; i<10; i++) {
        const carrot = document.createElement('img');
        carrot.setAttribute('class', 'carrot');
        carrot.setAttribute('src', 'img/carrot.png');
        carrot.setAttribute('alt', 'carrot');

        carrotSection.appendChild(carrot);
        const top = getRandomIntInclusive(30, 184);
        const left = getRandomIntInclusive(0, 734);
        carrot.style.transform = `translate(${left}px, ${top}px)`;

        carrot.onmouseover = logMouseOver;
        carrot.onmouseout = logMouseOut;
        function logMouseOver() {
            carrot.style.transform = `translate(${left}px, ${top}px) scale(1.1)`;
        }       
        function logMouseOut() {
            carrot.style.transform = `translate(${left}px, ${top}px)`;
        }

        carrot.addEventListener('click', (e) => {
            carrot_pull.play();
            e.target.remove();
            const carrots = document.querySelectorAll('.carrot');
            numOfLeft.textContent = `${carrots.length}`;
            if(numOfLeft.textContent === '0' && sec.textContent !== '0') {
                message.textContent = `You won!🎉`;
                result();
                game_win.play();
            }
        });
    };
}

function arrangeBug() {
    bugs.forEach((bug) => {
        const top = getRandomIntInclusive(30, 212);
        const left = getRandomIntInclusive(0, 750);
        bug.style.transform = `translate(${left}px, ${top}px)`;

        bug.onmouseover = logMouseOver;
        bug.onmouseout = logMouseOut;
        function logMouseOver() {
            bug.style.transform = `translate(${left}px, ${top}px) scale(1.1)`;
        }       
        function logMouseOut() {
            bug.style.transform = `translate(${left}px, ${top}px)`;
        }

        bug.addEventListener('click', () => {
            message.textContent = `You lost💩`;
            result();
            bug_pull.play();
        });
    });
}

function result() {
    bgm.pause();
    replaySection.style.display = `block`;
    clearInterval(nIntervId);
    nIntervId = null;
    playBtn.style.opacity = `0`;
}

let nIntervId;
function timer() {
    min.textContent = '0';
    sec.textContent = '10';
    
    if (!nIntervId) {
        nIntervId = setInterval(countdown, 1000);
    };

    let timeleft = 9;
    let count = 0;

    function countdown() {
    sec.textContent = timeleft;
    timeleft--;
    count += 1;
    if( count >= 10 ) {
        message.textContent = `You lost💩`;
        result();
        alert.play();
        timeleft = 9;
        count = 0;
        };
    }
}

playBtn.addEventListener('click', () => {
    bgm.play();
    bgm.loop = true;
    if(!nIntervId) {
        playBtn.innerHTML = `<i class="fas fa-square"></i>`;
        playground.style.display = `block`;
        timer();
        gamestart();
    } else if(nIntervId != null) {
        message.textContent = `replay❓`;
        result();
        alert.play();
    }
});

replayBtn.addEventListener('click', () => {
    bgm.play();
    bgm.loop = true;
    timer();
    gamestart();
    playBtn.style.opacity = `1`;
});
