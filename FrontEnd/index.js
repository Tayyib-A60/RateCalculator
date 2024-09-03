let rate = 0;
// const baseUrl = 'https://localhost:7298';
const baseUrl = 'https://rate-calculator-1-0.onrender.com';

let sendEnabled = false;

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

    const accountNumberInputs = document.getElementsByClassName('account-number');

    const sendButtons = document.getElementsByClassName('send');

    if(accountNumberInputs.length) {
        const accountNumberInput = accountNumberInputs[0];

        accountNumberInput.addEventListener('input', (event) => {
            const accountNumber = event.target.value;

            if(accountNumber.length === 10) {
                if(sendButtons.length) {
                    const sendButton = sendButtons[0];
                    sendButton.disabled = false;
                }
            } else {
                if(sendButtons.length) {
                    const sendButton = sendButtons[0];
                    sendButton.disabled = true;
                }
            }
        });
    }

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

function sendNow() {
    const sections = document.getElementsByClassName('flex-column');

    if(sections.length > 1) {
        sections[0].classList.remove('disp-flex');
        sections[0].classList.add('disp-none');
        sections[1].classList.remove('disp-none');
        sections[1].classList.add('disp-flex');
        sections[2].classList.remove('disp-flex');
        sections[2].classList.add('disp-none');
    }
}

function send() {
    const sections = document.getElementsByClassName('flex-column');

    if(sections.length > 2) {
        sections[0].classList.remove('disp-flex');
        sections[0].classList.add('disp-none');
        sections[1].classList.remove('disp-flex');
        sections[1].classList.add('disp-none');
        sections[2].classList.remove('disp-none');
        sections[2].classList.add('disp-flex');
    }

    const accountNumberInputs = document.getElementsByClassName('account-number');

    if(accountNumberInputs.length) {
        const accountNumberInput = accountNumberInputs[0];
        accountNumberInput.value = "";
    }

    const sendButtons = document.getElementsByClassName('send');

    if(sendButtons.length) {
        const sendButton = sendButtons[0];
        sendButton.disabled = true;
    }
}

function home() {
    const sections = document.getElementsByClassName('flex-column');

    if(sections.length > 2) {
        sections[0].classList.remove('disp-none');
        sections[0].classList.add('disp-flex');
        sections[1].classList.remove('disp-flex');
        sections[1].classList.add('disp-none');
        sections[2].classList.remove('disp-flex');
        sections[2].classList.add('disp-none');
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