function validateSpace(input, letter, event) {
    if ((input === ' ' || letter === ' ') && input !== letter) {
        event.preventDefault();
        return true;
    }

    return false;
}

function cleanInput(inputHandler) {
    editableContent.textContent = '';
    editableContent.removeEventListener('input', inputHandler);
}

function wrapText() {
    let modified = ''
    for (let i = 0; i < text.length; i++) {
        modified += `<span id="letter${i}">${text[i]}</span>`
        placeholder.innerHTML = modified
    }
}