const selectCrypto = document.getElementById('crypto-select');
const displayPrice = document.getElementById('crypto-price');
const alertInput = document.getElementById('alert-price');
const displayAlert = document.getElementById('alert-message');

let alertPrice = null;

alertInput.addEventListener('input', (e) => {
  alertPrice = parseFloat(e.target.value);
  checkAlert();
});

async function fetchCryptoList() {
  try {
    const response = await fetch('https://api.coinlore.net/api/tickers/');
    const data = await response.json();
    const top50Crypto = data.data.slice(0, 50);
    populateCryptoList(top50Crypto);
  } catch (error) {
    console.error("Error fetching the crypto list:", error);
  }
}

function populateCryptoList(cryptoData) {
  cryptoData.forEach(coin => {
    const option = document.createElement('option');
    option.value = coin.id;
    option.textContent = coin.name;
    selectCrypto.appendChild(option);
  });
}

async function fetchCryptoPrice(cryptoId) {
  try {
    const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`);
    const data = await response.json();
    const currentPrice = parseFloat(data[0].price_usd).toFixed(2);
    displayPrice.textContent = currentPrice;
    checkAlert(parseFloat(currentPrice));
  } catch (error) {
    console.error("Error fetching the crypto price:", error);
  }
}

function checkAlert(currentPrice) {
  if (alertPrice && currentPrice && currentPrice >= alertPrice) {
    const selectedCrypto = selectCrypto.options[selectCrypto.selectedIndex].text;
    displayAlert.textContent = `Alert: ${selectedCrypto} has reached or surpassed $${alertPrice}`;
    displayAlert.style.display = "block";
  } else {
    displayAlert.style.display = "none";
  }
}

selectCrypto.addEventListener('change', (event) => {
  const selectedCryptoId = event.target.value;
  fetchCryptoPrice(selectedCryptoId);
});

fetchCryptoList();
