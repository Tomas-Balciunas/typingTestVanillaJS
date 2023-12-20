"use strict";

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
let timeInSeconds = timeLimit;


const allowed = ['Backspace', 'Escape', 'Enter'];
let userText = '';
const classes = {
    true: 'correct',
    false: 'incorrect'
}

let accuracy = {
    total: 0,
    correct: 0,
    incorrect: 0,
    percentage: 0,
    words: 0,
    wpm: 0,
    cwpm: 0
};

function main() {
    timerElement.innerText = timeLimit;
    wrapText();
    initiateTest();
}

function getText() {
    text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    placeholder.innerText = text
}

getText()
updateCharacters()
updateWords()
main()