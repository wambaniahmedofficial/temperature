document.addEventListener('DOMContentLoaded', function() {
    const tempInput = document.getElementById('temp-input');
    const unitInput = document.getElementById('unit-input');
    const resultCelsius = document.getElementById('result-celsius').querySelector('span');
    const resultFahrenheit = document.getElementById('result-fahrenheit').querySelector('span');
    const resultKelvin = document.getElementById('result-kelvin').querySelector('span');
    const resultRankine = document.getElementById('result-rankine').querySelector('span');
    const historyList = document.getElementById('history-list');
    const historyGraph = document.getElementById('history-graph');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsClose = document.getElementById('settings-close');
    const unitSelect = document.getElementById('unit-select');

    let historyData = [];

    const convertTemperature = () => {
        const temp = parseFloat(tempInput.value) || 0;
        const unit = unitInput.value;

        let celsius, fahrenheit, kelvin, rankine;

        switch (unit) {
            case 'Celsius':
                celsius = temp;
                fahrenheit = (temp * 9/5) + 32;
                kelvin = temp + 273.15;
                rankine = (temp + 273.15) * 9/5;
                break;
            case 'Fahrenheit':
                celsius = (temp - 32) * 5/9;
                fahrenheit = temp;
                kelvin = (temp - 32) * 5/9 + 273.15;
                rankine = temp + 459.67;
                break;
            case 'Kelvin':
                celsius = temp - 273.15;
                fahrenheit = (temp - 273.15) * 9/5 + 32;
                kelvin = temp;
                rankine = temp * 9/5;
                break;
            case 'Rankine':
                celsius = (temp - 491.67) * 5/9;
                fahrenheit = temp - 459.67;
                kelvin = temp * 5/9;
                rankine = temp;
                break;
        }

        resultCelsius.textContent = celsius.toFixed(2);
        resultFahrenheit.textContent = fahrenheit.toFixed(2);
        resultKelvin.textContent = kelvin.toFixed(2);
        resultRankine.textContent = rankine.toFixed(2);
        const historyItem = {
            temp,
            unit,
            celsius: celsius.toFixed(2),
            fahrenheit: fahrenheit.toFixed(2),
            kelvin: kelvin.toFixed(2),
            rankine: rankine.toFixed(2)
        };
        historyData.push(historyItem);

        const historyItemElement = document.createElement('li');
        historyItemElement.textContent = `${temp} ${unit} → ${celsius.toFixed(2)} °C, ${fahrenheit.toFixed(2)} °F, ${kelvin.toFixed(2)} K, ${rankine.toFixed(2)} °R`;
        historyList.appendChild(historyItemElement);
        updateGraph();
    };

    const updateGraph = () => {
        const labels = historyData.map((item, index) => `Entry ${index + 1}`);
        const celsiusData = historyData.map(item => item.celsius);
        const fahrenheitData = historyData.map(item => item.fahrenheit);
        const kelvinData = historyData.map(item => item.kelvin);
        const rankineData = historyData.map(item => item.rankine);

        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(historyGraph, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Celsius',
                        data: celsiusData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Fahrenheit',
                        data: fahrenheitData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Kelvin',
                        data: kelvinData,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Rankine',
                        data: rankineData,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}°`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        }
                    }
                }
            }
        });
    };

    tempInput.addEventListener('input', convertTemperature);
    unitInput.addEventListener('change', convertTemperature);

    convertTemperature();
});
