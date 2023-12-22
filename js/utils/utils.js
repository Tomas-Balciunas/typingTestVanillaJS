"use strict";

export function getText() {
    // return new Promise(resolve => {
    //     text = 'test text test text test text test text test text test text ';
    //     placeholder.innerText = text;
    //     resolve()
    // })
    return fetch('https://api.quotable.io/quotes/random?limit=10')
        .then(response => response.json())
        .then(data => {
            text = data.map(function (e) {
                return e.content
            }).join(' ');
            placeholder.innerText = text;
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