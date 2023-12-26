"use strict";

import { initiateTest } from "./actions/wpm.js";
import { getText, wrapText, reset, clearStats, updateChart } from "./utils/utils.js";
import { displayResults, storeResult } from "./actions/stats.js";

testBtn.addEventListener('mousedown', launchTest)
textBtn.addEventListener('mousedown', async function () {
    getText().then(() => {
        wrapText();
    })
})
chartSelect.addEventListener('change', updateChart);

//localStorage.clear();

async function appStart() {
    timerElement.innerText = timeLimit;
    getText().then(() => {
        updateCharactersElement();
        updateWordsElement();
        wrapText();
        displayResults();
        updateChart()
    });
}

async function launchTest() {
    clearStats()
    setTimeout(function () { editableContent.focus(); }, 0);
    testBtn.disabled = true
    textBtn.disabled = true
    const finished = await initiateTest();

    if (finished === true) {
        const resultCopy = result
        storeResult(resultCopy);
        appendResult(resultCopy);
        updateChart()
    }

    reset()

    if (finished === 'Enter') {
        launchTest()
    }
}

appStart();