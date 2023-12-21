function startTimer() {
    if (!timerStarted) {
        timeInSeconds = timeLimit;
        timeInSeconds--;
        timerPromise = new Promise(resolve => {
            const initiateTimer = function () {
                editableContent.removeEventListener('keydown', initiateTimer);

                intervalId = setInterval(function () {
                    timerElement.textContent = timeInSeconds;

                    if (timeInSeconds === 0) {
                        clearInterval(intervalId);
                        resolve({ timeout: true })
                    } else {
                        console.log(timeInSeconds)
                        timeInSeconds--;
                    }
                }, 1000)
            }

            timerStarted = true;
            editableContent.addEventListener('keydown', initiateTimer);
        });
    }
};