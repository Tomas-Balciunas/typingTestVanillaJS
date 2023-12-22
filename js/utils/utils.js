"use strict";

export function getText() {
    // return new Promise(resolve => {
    //     text = 'test text test text test text test text test text test text ';
    //     placeholder.innerText = text;
    //     resolve()
    // })
    return fetch('http://metaphorpsum.com/sentences/20')
        .then(response => response.text())
        .then(data => {
            text = data;
            placeholder.innerText = data;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

export function wrapText() {
    let letters = text.split('')
    let start = performance.now()
    placeholder.innerHTML = letters.map(function (letter, i) {
        return `<span id="letter${i}">${letter}</span>`;
    }).join('');
    childrenList = placeholder.children
    let end = performance.now()
    console.log(`
    start: ${start}
    end: ${end}
    diff: ${end-start}
    `)
}

export function reset() {
    let spans = placeholder.children

    for (let i = 0; i < spans.length; i++) {
        spans[i].removeAttribute('class');
    }

    clearInterval(intervalId);
    timerElement.innerText = timeLimit;
    timerStarted = false;
    userText = '';
    testBtn.disabled = false
    textBtn.disabled = false
}

export function clearStats() {
    for (let key in result) {
        result[key] = 0
    }
    updateCharactersElement()
    updateWordsElement()
}