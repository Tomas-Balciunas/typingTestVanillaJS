"use strict";

testBtn.addEventListener('mousedown', launchTest)
textBtn.addEventListener('mousedown', async function () {
    getText().then(() => {
        wrapText();
    })
})

//localStorage.clear();

async function appStart() {
    timerElement.innerText = timeLimit;
    getText().then(() => {
        updateCharactersElement();
        updateWordsElement();
        wrapText();
        displayResults();
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
    }

    reset()

    if (finished === 'Enter') {
        launchTest()
    }
}

appStart();