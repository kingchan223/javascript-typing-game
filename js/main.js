const GAME_TIME = 8;
let score = 0;
let time = 9;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    buttonChange('게임 로딩중...');
    getWords();
    wordInput.addEventListener('input', checkMatch)
}

//게임실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임중')
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange('게임시작');
        clearInterval(checkInterval)
    }
}

// 단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=30')
        .then(function (response) {
            // handle success
            response.data.forEach((word) => {
                if (word.length < 10) {
                    words.push(word);
                }
            })
            buttonChange('게임시작');
            console.log(words);
        })
        .catch(function (error) {
            // handle error
            console.log(error);

        })
}

wordInput.addEventListener('input', checkMatch)

// 단어 일치 체크
function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if (!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }

}

//setInterval(countDown,1000);
buttonChange('게임시작')


function countDown() {
    time > 0 ? time-- : isPlaying = false; //(조건) ? 참:거짓
    if (!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}