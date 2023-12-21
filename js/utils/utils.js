function wrapText() {
    let letters = text.split('')
    placeholder.innerHTML = letters.map(function (letter, i) {
        return `<span id="letter${i}">${letter}</span>`;
    }).join('');
}

function statsHandler(validated) {
    validated ? result.correct++ : result.incorrect++
    result.total++
    result.percentage = (parseInt(result.correct) / parseInt(result.total) * 100).toPrecision(4)
    updateCharacters()
}

function appendSymbol(input) {
    userText += input;
}

function updateCharacters() {
    total.innerText = result.total;
    correct.innerText = result.correct;
    incorrect.innerText = result.incorrect;
    percentage.innerText = result.percentage;
}

function updateWords() {
    wordsElem.innerText = result.words
    wpmElem.innerText = result.wpm
    cwpmElem.innerText = result.cwpm
}

function startTimer() {
    if (!timerStarted) {
        timeInSeconds = timeLimit;
        timeInSeconds--;
        timerPromise = new Promise(resolve => {
            const initiateTimer = function () {
                editableContent.removeEventListener('keydown', initiateTimer);

                intervalId = setInterval(function () {
                    timerElement.textContent = timeInSeconds;

                    if (timeInSeconds === 0) {
                        clearInterval(intervalId);
                        resolve({ timeout: true })
                    } else {
                        console.log(timeInSeconds)
                        timeInSeconds--;
                    }
                }, 1000)
            }

            timerStarted = true;
            editableContent.addEventListener('keydown', initiateTimer);
        });
    }
};

function wpmHandler() {
    const separator = ' ';
    let textArr = formatText(text, separator)
    let userTextArr = formatText(userText, separator)
    let correctW = compareWords(textArr, userTextArr)
    calculateWords(userTextArr, correctW)
}

function calculateWords(userTextArr, correctW) {
    let calculator = (c) => {
        return ((60 / (timeLimit - timeInSeconds)) * c).toPrecision(2);
    }
    const count = userTextArr.length
    const countC = correctW.length
    const wpm = calculator(count)
    const cwpm = calculator(countC)

    result.words = count
    result.wpm = wpm
    result.cwpm = cwpm

    updateWords()
}

function compareWords(textArr, userTextArr) {
    let cW = []
    for (let i = 0; i < userTextArr.length; i++) {
        if (userTextArr[i] === textArr[i]) {
            cW.push(userTextArr[i])
        }
    }

    return cW;
}

function formatText(text, separator) {
    return text.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(separator);
}