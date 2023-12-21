function displayResults() {
    for (const [key, value] of Object.entries(localStorage).sort()) {
        const parsedResult = JSON.parse(localStorage.getItem(key))
        appendResult(parsedResult)
    }
}

function storeResult(data) {
    let len = Object.keys(localStorage).length + 1
    localStorage.setItem(`attempt${len}`, JSON.stringify(data))
}

function statsHandler(validated) {
    validated ? result.correct++ : result.incorrect++
    result.total++
    result.percentage = (parseInt(result.correct) / parseInt(result.total) * 100).toPrecision(2)
    updateCharactersElement()
}

function wpmHandler() {
    const separator = ' ';
    let textSplit = formatText(text, separator)
    let userTextSplit = formatText(userText, separator)
    let correctWords = compareWords(textSplit, userTextSplit)
    calculateWords(userTextSplit, correctWords)
    updateWordsElement()
}