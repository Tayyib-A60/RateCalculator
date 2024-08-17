let rate = 0;
const baseUrl = 'https://localhost:7298';

async function init() {
    const getRateAPIResponse = await fetch(`${baseUrl}/api/Rate/get-rate`);

    const rateResponse = await getRateAPIResponse.json();

    rate = rateResponse.rate;

    const exchangeRate = document.getElementById('exchange-rate');

    if(exchangeRate) {
        exchangeRate.innerHTML = `1 GBP = ${rate} NGN`
    }

    const gbpInputs = document.getElementsByClassName('from-currency');
    const ngnInputs = document.getElementsByClassName('to-currency');

    if(gbpInputs.length && ngnInputs.length) {
        const gbpInput = gbpInputs[0];
        const ngnInput = ngnInputs[0];

        gbpInput.addEventListener('input', (event) => {
            const ngnCalculatedValue = Number(event.target.value) * rate;
            ngnInput.value = ngnCalculatedValue.toFixed(2);
        });

        ngnInput.addEventListener('input', (event) => {
            const gbpCalculatedValue = Number(event.target.value) / rate;
            gbpInput.value = gbpCalculatedValue.toFixed(2);
        });
    }
}

function numberFormatter(value, currency) {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(value);

    console.log(formattedValue);

    return formattedValue;
}

setTimeout(async () => {
    await init();
}, 1 * 1_000);