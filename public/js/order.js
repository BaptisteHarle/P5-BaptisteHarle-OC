document.addEventListener('DOMContentLoaded', () => {
  const basket = localStorage.getItem('basket');
  const products = basket ? JSON.parse(basket) : [];
  injectProducts(products);
  calculatePrice(products);
});
function injectProducts(products) {
  const container = document.getElementById('order-section');
  container.innerHTML = `
    <h1>Votre commande</h1>
    ${products.map(product => `
      <div class="commande-section">
        <img class="commande-image" src="${product.imageUrl}" alt="${product.name}">
        <section class="commande-text">
          <h3>${product.name}</h3>
          <p>${product.price / 100}€</p>
        </section>
      </div> 
    `)}
  `;
}
function calculatePrice(products) {
  const taxFreePriceEl = document.getElementById('tax-free-price');
  const taxAmountEl = document.getElementById('tax-amount');
  const taxIncludedEl = document.getElementById('tax-included-price');
  let taxIncludedPrice = 0;
  let taxFreePrice = 0;
  let taxAmount = 0;
  products.forEach(product => taxIncludedPrice = taxIncludedPrice + product.price);
  taxIncludedPrice = taxIncludedPrice / 100;
  taxFreePrice = taxIncludedPrice / 1.2;
  taxAmount = taxIncludedPrice - taxFreePrice;
  taxFreePriceEl.innerHTML = `Montant HT: ${taxFreePrice.toFixed(2)}€`;
  taxAmountEl.innerHTML = `TVA 20% : ${taxAmount.toFixed(2)}€`;
  taxIncludedEl.innerHTML = `Total TTC: ${taxIncludedPrice.toFixed(2)}€`;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateName(name) {
  return name.length > 2;
}
function validateInput(value) {
  return value.length > 1; 
}


document.getElementById('post-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('firstName').value;
  const address = document.getElementById('adresse').value;
  const city = document.getElementById('city').value
  const contact = {
    firstName,
    lastName,
    address,
    city,
    email,
  }
  const basket = localStorage.getItem('basket');
  const productsFromBasket = basket ? JSON.parse(basket) : [];
  const products = productsFromBasket.map(p => p._id);
  const body = {
        contact,
        products,
  }

  if (validateEmail(email) && validateName(firstName) && validateName(lastName) && validateInput(city) && validateInput(address)) {
   const response = await NetworkInterface.post('http://localhost:3000/api/cameras/order', body);
   alert('votre commande a bien etait effectuée'); 
   window.location.href = '/congrats';
   
  } else {
    console.log('error triggered')
    console.log(contact);
    console.log(products);
  }
});