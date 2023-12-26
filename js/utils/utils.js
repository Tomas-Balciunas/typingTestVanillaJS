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

export function chartView(value) {
    if (chart) {
        chart.destroy()
    }

    let xValues = [];
    let yValues = [];

    for (const [key, attempt] of Object.entries(localStorage).sort()) {
        xValues.push(`Attempt ${JSON.parse(attempt)['attempt']}`)
        yValues.push(JSON.parse(attempt)[value])
    }

    chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0.2,
                color: "rgba(213, 89, 89,1.0)",
                backgroundColor: "rgba(213, 89, 89,1.0)",
                borderColor: "rgba(213, 89, 89,1.0)",
                data: yValues
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: { fontColor: "white", min: 0 }, 
                    gridLines: {color: "rgba(150, 150, 150,0.7)"}
                }],
                xAxes: [{
                    ticks: { fontColor: "white"}, 
                    gridLines: {color: "rgba(150, 150, 150,0.7)"}
                }]
            }
        }
    });
}

export function updateChart() {
    let radios = chartSelect.elements['chart-radio']

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            chartView(radios[i].value)
            return;
        }
    }
}