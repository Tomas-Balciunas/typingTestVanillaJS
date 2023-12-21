function getText() {
    return new Promise((resolve) => {
        text = 'Test textTest textTest textTest textTest textTest textTest textTest textTest textTest textTest textTest text textTest text textTest text textTest text textTest text';
        placeholder.innerText = text; 
        resolve()
    })
    // fetch('http://metaphorpsum.com/sentences/20')
    //     .then(response => response.text())
    //     .then(data => {
    //         text = data;
    //         placeholder.innerText = data;
    //     })
    //     .catch(error => {
    //         console.error(`Error: ${error}`);
    //     });
}

function wrapText() {
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
    res: ${end-start}
    `)
    
}

function reset() {
    let spans = placeholder.children

    for (let i = 0; i < spans.length; i++) {
        spans[i].removeAttribute('class');
    }

    clearInterval(intervalId);
    timerElement.innerText = timeLimit;
    timerStarted = false;
    testBtn.disabled = false
    textBtn.disabled = false
}

function clearStats() {
    for (let key in result) {
        result[key] = 0
    }
    updateCharactersElement()
    updateWordsElement()
}