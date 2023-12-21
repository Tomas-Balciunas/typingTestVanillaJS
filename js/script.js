"use strict";

let timerStarted = false
let earlyPromise = false
let timerPromise
let intervalId
let text
const timeLimit = 60
const editableContent = document.querySelector('#editableContent');
const placeholder = document.querySelector('#placeholder');
const total = document.querySelector('#total');
const correct = document.querySelector('#correct');
const incorrect = document.querySelector('#incorrect');
const percentage = document.querySelector('#percentage');
const timerElement = document.querySelector('#timer');
const wordsElem = document.querySelector('#words');
const wpmElem = document.querySelector('#wpm');
const cwpmElem = document.querySelector('#cwpm');
const resultContainer = document.querySelector('#resultContainer');
const testBtn = document.querySelector('#testBtn')
let timeInSeconds
localStorage.clear();

const allowed = ['Backspace', 'Escape', 'Enter'];
let userText = '';
const classes = {
    true: 'correct',
    false: 'incorrect'
}

let result = {
    total: 0,
    correct: 0,
    incorrect: 0,
    percentage: 0,
    words: 0,
    wpm: 0,
    cwpm: 0
};

async function appStart() {
    timerElement.innerText = timeLimit;
    testBtn.addEventListener('mousedown', launchTest)
    getText().then(() => {
        updateCharacters();
        updateWords();
        wrapText();
        displayResults();
    });
}

function reset() {
    let spans = placeholder.children

    for (let i = 0; i < spans.length; i++) {
        spans[i].removeAttribute('class');
    }

    for (let key in result) {
        result[key] = 0
    }

    clearInterval(intervalId);
    timerElement.innerText = timeLimit;
    updateCharacters()
    updateWords()
    timerStarted = false;
    testBtn.disabled = false
}

async function launchTest() {
    testBtn.disabled = true
    const finished = await initiateTest();
    const resultCopy = result

    if (finished === true) {
        storeResult(resultCopy);
        appendResult(resultCopy);
    }

    reset()

    if (finished === 'Enter') {
        launchTest()
    }
}

function displayResults() {
    for (const [key, value] of Object.entries(localStorage)) {
        const parsedResult = JSON.parse(localStorage.getItem(key))
        appendResult(parsedResult)
    }
}

function storeResult(data) {
    let len = Object.keys(localStorage).length + 1
    localStorage.setItem(`attempt${len}`, JSON.stringify(data))
}

function appendResult(data) {
    const div = document.createElement('div');
    div.classList.add('result')
    resultContainer.appendChild(div)

    for (const [key, value] of Object.entries(data)) {
        const li = document.createElement('li')
        li.innerText = `${key}: ${value}`
        div.appendChild(li)
    }
}

function getText() {
    return fetch('http://metaphorpsum.com/sentences/10')
        .then(response => response.text())
        .then(data => {
            text = data;
            placeholder.innerText = data;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

appStart();