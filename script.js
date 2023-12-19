"use strict";

let text
let editableContent = document.querySelector('#editableContent');
let placeholder = document.querySelector('#placeholder');
let total = document.querySelector('#total');
let correct = document.querySelector('#correct');
let incorrect = document.querySelector('#incorrect');
let percentage = document.querySelector('#percentage');

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
    percentage: 0
};

function main() {
    wrapText();
    initiateTest();
}

function getText() {
    text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    placeholder.innerText = text
}

getText()
updateStats()
main()