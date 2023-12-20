function wrapText() {
    let modified = ''
    for (let i = 0; i < text.length; i++) {
        modified += `<span id="letter${i}">${text[i]}</span>`
        placeholder.innerHTML = modified
    }
}

function statsHandler(validated) {
    validated ? accuracy.correct++ : accuracy.incorrect++
    accuracy.total++
    accuracy.percentage = (parseInt(accuracy.correct) / parseInt(accuracy.total) * 100).toPrecision(4)
    updateCharacters()
}

function appendSymbol(input) {
    userText += input;
}

function updateCharacters() {
    total.innerText = accuracy.total;
    correct.innerText = accuracy.correct;
    incorrect.innerText = accuracy.incorrect;
    percentage.innerText = accuracy.percentage;
}

function updateWords() {
    wordsElem.innerText = accuracy.words
    wpmElem.innerText = accuracy.wpm
    cwpmElem.innerText = accuracy.cwpm
}

function displayTimer() {
    timeInSeconds--;
    let timerId = setInterval(function () {
        timerElement.textContent = timeInSeconds;

        if (timeInSeconds === 0) {
            clearInterval(timerId);
        } else {
            timeInSeconds--;
        }
    }, 1000)
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

    accuracy.words = count
    accuracy.wpm = wpm
    accuracy.cwpm = cwpm

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