"use strict";

let text
let editableContent = document.querySelector('#editableContent');
let placeholder = document.querySelector('#placeholder');


function highlightText(i, className) {
    document.querySelector(`#letter${i}`).classList.add(className, 'highlighted')
}

function handleInput(letter) {
    let preventFlag = false;

    return new Promise(resolve => {
        let inputHandler = function (event) {
            preventFlag = validateSpace(event.data, letter, event)
            cleanInput(inputHandler);
            resolve({ input: event.data, preventFlag });
        }

        editableContent.addEventListener('input', inputHandler);
    });
}

async function mainLoop() {
    wrapText()

    for (let i = 0; i <= text.length; i++) {
        let letter = text[i];
        document.querySelector(`#letter${i}`).classList.add('bold')
        console.log(letter + ' ' + i)
        const { input, preventFlag } = await handleInput(letter);
        console.log(input)

        if (preventFlag) {
            i--;
            continue;
        }

        const className = validateInput(input, letter);

        highlightText(i, className)

        document.querySelector(`#letter${i}`).classList.remove('bold')

        if (input === 'Escape') {
            console.log('Exiting the loop.');
            break;
        }
    }
}

function validateInput(input, letter) {
    if (input !== letter) {
        return 'incorrect';
    }

    return 'correct';
}

function getText() {
    text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    placeholder.innerText = text
}

getText()
mainLoop()





// function moveCursorToEnd() {
//     const range = document.createRange();
//     const selection = window.getSelection();

//     if (editableContent.lastChild) {
//         range.setStartAfter(editableContent.lastChild);
//         range.collapse(true);

//         selection.removeAllRanges();
//         selection.addRange(range);
//     }
// }