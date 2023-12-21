const timeLimit = 60
let timerStarted = false
let timerPromise
let timeInSeconds
let intervalId
let text
let userText = '';
let childrenList
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
const textBtn = document.querySelector('#textBtn')

const allowed = ['Backspace', 'Escape', 'Enter'];

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