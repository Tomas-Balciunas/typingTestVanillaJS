function wrapText() {
    let modified = ''
    for (let i = 0; i < text.length; i++) {
        modified += `<span id="letter${i}">${text[i]}</span>`
        placeholder.innerHTML = modified
    }
}

function statsHandler(validated) {
    validated ? accuracy.correct++ : accuracy.incorrect++
    accuracy.total++
    accuracy.percentage = (parseInt(accuracy.correct) / parseInt(accuracy.total) * 100).toPrecision(4)
    console.log(accuracy.percentage)
    updateStats()
}

function appendSymbol(input) {
    userText += input;
    console.log(userText)
}

function updateStats() {
    total.innerText = accuracy.total;
    correct.innerText = accuracy.correct;
    incorrect.innerText = accuracy.incorrect;
    percentage.innerText = accuracy.percentage;
}