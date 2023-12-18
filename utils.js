function validateSpace(input, letter, event) {
    if ((input === ' ' || letter === ' ') && input !== letter && input !== 'Backspace') {
        event.preventDefault();
        return true;
    }

    return false;
}

function validateInput(input, letter) {
    if (input !== letter) {
        return 'incorrect';
    }

    return 'correct';
}

function cleanInput(inputHandler) {
    editableContent.textContent = '';
    editableContent.removeEventListener('keydown', inputHandler);
}

function wrapText() {
    let modified = ''
    for (let i = 0; i < text.length; i++) {
        modified += `<span id="letter${i}">${text[i]}</span>`
        placeholder.innerHTML = modified
    }
}

function highlightText(i, className) {
    document.querySelector(`#letter${i}`).classList.add(className, 'highlighted')
}

function blinkHandler(blink, i) {
    if (blink) {
        document.querySelector(`#letter${i}`).classList.add('bold')
    } else {
        document.querySelector(`#letter${i}`).classList.remove('bold')
    }
}

function handleBackspace(i) {
    if (i > 0) {
        blinkHandler(false, i)
        document.querySelector(`#letter${i - 1}`).classList = [];
        return i - 2
    }

    return i - 1;
}