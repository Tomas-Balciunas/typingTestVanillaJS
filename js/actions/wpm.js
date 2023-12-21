async function initiateTest() {
    for (let i = 0; i < text.length; i++) {
        try {
            blinkHandler(true, i)
            const letter = text[i];
            const result = await Promise.race([inputHandler(letter, startTimer()), timerPromise]);

            if (result.command) {
                return result.command;
            }

            if (result.timeout) {
                return true
            }

            const { input, preventFlag } = result

            if (preventFlag) {
                i--;
                continue;
            }

            switch (input) {
                case 'Backspace':
                    i = backspaceHandler(i);
                    continue;
                case ' ':
                    blinkHandler(false, i);
                    appendSymbol(input);
                    wpmHandler()
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

    return true
}

function inputHandler(letter) {
    let preventFlag = false;

    return new Promise(resolve => {
        editableContent.addEventListener('keydown', userInput = (event) => {
            const input = event.key;

            if (input.length == 1) {
                preventFlag = validateSpace(input, letter, event)
                cleanInput(userInput);
                resolve({ input, preventFlag });
            } else if (allowed.includes(input)) {
                cleanInput(userInput);
                resolve({ command: input })
            }

            event.preventDefault()
        });
    });
}