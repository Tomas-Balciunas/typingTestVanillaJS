async function initiateTest() {
    let timerStarted = false
    let timer

    const startTimer = function () {
        if (!timerStarted) {
            timer = new Promise(resolve => {
                let initiateTimer = function () {
                    console.log('started')
                    setTimeout(() => resolve({ timeout: true }), 200000);
                    timerStarted = true;
                    editableContent.removeEventListener('keydown', initiateTimer)
                }

                editableContent.addEventListener('keydown', initiateTimer)
            });
        }
    }

    for (let i = 0; i < text.length; i++) {
        try {
            blinkHandler(true, i)
            const letter = text[i];
            const result = await Promise.race([inputHandler(letter, startTimer()), timer]);

            if (result.timeout) {
                break
            }

            const { input, preventFlag } = result

            if (preventFlag) {
                i--;
                continue;
            }

            switch (input) {
                case 'Escape':
                    break;
                case 'Backspace':
                    i = backspaceHandler(i);
                    continue;
                case ' ':
                    blinkHandler(false, i);
                    appendSymbol(input);
                    continue;
                default:
                    const validated = validateInput(input, letter);
                    highlightHandler(i, validated);
                    statsHandler(validated);
                    appendSymbol(input)
                    blinkHandler(false, i);
            }
        } catch (e) {
            console.log(`Error: ${e}`)
        }

    }
}

function inputHandler(letter) {
    let preventFlag = false;

    return new Promise(resolve => {
        editableContent.addEventListener('keydown', userInput = (event) => {
            const input = event.key;

            if (allowed.includes(input) || input.length == 1) {
                preventFlag = validateSpace(input, letter, event)
                cleanInput(userInput);
                resolve({ input, preventFlag });
            }

            event.preventDefault()
        });
    });
}

function highlightHandler(i, validated) {
    document.querySelector(`#letter${i}`).classList.add(classes[validated], 'highlighted')
}

function blinkHandler(blink, i) {
    if (blink) {
        document.querySelector(`#letter${i}`).classList.add('bold')
    } else {
        document.querySelector(`#letter${i}`).classList.remove('bold')
    }
}

function backspaceHandler(i) {
    if (i > 0) {
        blinkHandler(false, i)
        userText = userText.slice(0, -1)
        console.log(userText)
        document.querySelector(`#letter${i - 1}`).classList = [];
        return i - 2
    }

    return i - 1;
}

function validateSpace(input, letter, event) {
    if ((input === ' ' || letter === ' ') && input !== letter && input !== 'Backspace') {
        event.preventDefault();
        return true;
    }

    return false;
}

function validateInput(input, letter) {
    return input === letter
}

function cleanInput(inputHandler) {
    editableContent.textContent = '';
    editableContent.removeEventListener('keydown', inputHandler);
}