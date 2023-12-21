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
        document.querySelector(`#letter${i - 1}`).classList = [];
        showOrHideLetters(i, false)

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

function showOrHideLetters(i, bool) {
    if (i >= 15) {
        if (bool) {
            childrenList[i - 15].classList.add('hidden')
        } else {
            childrenList[i - 15].classList.remove('hidden')
        }
    }
}