"use strict";

import { startTimer } from "./timer.js";
import { statsHandler, wpmHandler } from "./stats.js";

export async function initiateTest() {
    for (let i = 0; i < text.length; i++) {
        try {
            blinkHandler(true, i)
            const letter = text[i];
            const result = await Promise.race([inputHandler(letter, startTimer()), timerPromise]);
            const { command, input, timeout, invalid } = result || {};

            if (command === 'Backspace') {
                i = backspaceHandler(i);
                continue
            } else if (command) {
                return command;
            } else if (timeout) {
                return true
            } else if (invalid) {
                i--;
                continue;
            } else {
                input === ' ' ? spaceBundle(input, i) : symbolBundle(input, i, letter)
            }

            blinkHandler(false, i);
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }
    return true
}

function inputHandler(letter) {
    return new Promise(resolve => {
        editableContent.addEventListener('keydown', function userInput (event)  {
            const input = event.key;

            if (input.length == 1) {
                cleanInput(userInput);
                resolve({ input, invalid: validateSpace(input, letter, event) });
            } else if (allowed.includes(input)) {
                cleanInput(userInput);
                resolve({ command: input })
            }

            event.preventDefault()
        });
    });
}

function spaceBundle(input, i) {
    blinkHandler(false, i);
    appendSymbol(input);
    wpmHandler()
    showOrHideLetters(i, true)
}

function symbolBundle(input, i, letter) {
    const validated = validateInput(input, letter);
    highlightHandler(i, validated);
    statsHandler(validated);
    appendSymbol(input)
    showOrHideLetters(i, true)
}