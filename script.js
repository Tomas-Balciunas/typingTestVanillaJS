"use strict";

let text
let editableContent = document.querySelector('#editableContent');
let placeholder = document.querySelector('#placeholder');

const allowed = ['Backspace', 'Escape', 'Enter']

async function main() {
    wrapText();
    let timerStarted = false
    let timer

    let startTimer = function () {
        if (!timerStarted) {
            timer = new Promise(resolve => {
                let initiateTimer = function () {
                    console.log('started')
                    setTimeout(() => resolve({ timeout: true }), 10000);
                    timerStarted = true;
                    editableContent.removeEventListener('keydown', initiateTimer)
                }

                editableContent.addEventListener('keydown', initiateTimer)
            });
        }
    }

    for (let i = 0; i < text.length; i++) {
        blinkHandler(true, i)
        const letter = text[i];

        try {
            const result = await Promise.race([handleInput(letter, startTimer()), timer]);
            console.log(result)
            if (result.timeout) {
                console.log('Timeout')
                break
            }

            const { input, preventFlag } = result

            if (preventFlag) {
                i--;
                continue;
            }

            if (input === 'Escape') {
                break;
            }

            if (input === 'Backspace') {
                i = handleBackspace(i);
                continue
            }

            if (input === ' ') {
                blinkHandler(false, i)
                continue
            }

            const className = validateInput(input, letter);
            highlightText(i, className)

            blinkHandler(false, i)
        } catch (e) {
            console.log(`Error: ${e}`)
        }

    }
}

function handleInput(letter) {
    let preventFlag = false;

    return new Promise(resolve => {
        let inputHandler = function (event) {
            const input = event.key;

            if (allowed.includes(input) || input.length == 1) {
                preventFlag = validateSpace(input, letter, event)
                cleanInput(inputHandler);
                resolve({ input, preventFlag });
            }

            event.preventDefault()
        }

        editableContent.addEventListener('keydown', inputHandler);
    });
}

function getText() {
    text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    placeholder.innerText = text
}

getText()
main()