"use strict";

export function displayResults() {
    for (const [key, value] of Object.entries(localStorage).sort()) {
        const parsedResult = JSON.parse(localStorage.getItem(key))
        appendResult(parsedResult)
    }
}

export function storeResult(data) {
    let len = Object.keys(localStorage).length + 1
    localStorage.setItem(`attempt${len}`, JSON.stringify(data))
}

export function statsHandler(validated) {
    validated ? result.correct++ : result.incorrect++
    result.total++
    result.percentage = parseInt((parseInt(result.correct) / parseInt(result.total) * 100))
    updateCharactersElement()
}

export function wpmHandler() {
    const separator = ' ';
    let textSplit = formatText(text, separator)
    let userTextSplit = formatText(userText, separator)
    let correctWords = compareWords(textSplit, userTextSplit)

    calculateWords(userTextSplit, correctWords)
    updateWordsElement()
}