"use strict";

function appendResult(data) {
    const div = document.createElement('div');
    div.classList.add('result')
    resultContainer.prepend(div)

    const keys = ['attempt', 'total', 'correct', 'incorrect', 'percentage', 'words', 'wpm', 'cwpm']

    for (let i = 0; i < labels.length; i++) {
        const li = document.createElement('li')
        li.innerText = `${labels[i]}: ${data[keys[i]]}`
        div.appendChild(li)
    }
}

function updateCharactersElement() {
    total.innerText = result.total;
    correct.innerText = result.correct;
    incorrect.innerText = result.incorrect;
    percentage.innerText = result.percentage;
}

function updateWordsElement() {
    wordsElem.innerText = result.words
    wpmElem.innerText = result.wpm
    cwpmElem.innerText = result.cwpm
}

function compareWords(textSplit, userTextSplit) {
    let cW = []
    for (let i = 0; i < userTextSplit.length; i++) {
        if (userTextSplit[i] === textSplit[i]) {
            cW.push(userTextSplit[i])
        }
    }

    return cW;
}

function calculateWords(userTextSplit, correctWords) {
    let calculator = (c) => {
        return ((60 / (timeLimit - timeInSeconds)) * c);
    }

    const count = userTextSplit.length
    const countC = correctWords.length
    const wpm = parseInt(calculator(count))
    const cwpm = parseInt(calculator(countC))
    result.words = count
    result.wpm = wpm
    result.cwpm = cwpm
}

function appendSymbol(input) {
    userText += input;
}

function formatText(text, separator) {
    return text.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(separator);
}