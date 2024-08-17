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

    // if(inputs.length > 0) {
    if(gbpInputs.length && ngnInputs.length) {
        const gbpInput = gbpInputs[0];
        const ngnInput = ngnInputs[0];

        gbpInput.addEventListener('input', (event) => {
            const ngnCalculatedValue = event.target.valueAsNumber * rate;
            ngnInput.value = ngnCalculatedValue.toFixed(2);
        });

        ngnInput.addEventListener('input', (event) => {
            const gbpCalculatedValue = event.target.valueAsNumber / rate;
            gbpInput.value = gbpCalculatedValue.toFixed(2);
        });
    }
}

setTimeout(async () => {
    await init();
}, 1 * 1_000);