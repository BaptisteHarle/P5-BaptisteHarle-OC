document.addEventListener('DOMContentLoaded', () => {
  const basket = localStorage.getItem('basket');
  const products = basket ? JSON.parse(basket) : [];
  injectProducts(products);
  calculatePrice(products);
  showDeleteButton();
});
function injectProducts(products) {
  const container = document.getElementById('order-section');
  container.innerHTML = `
    <h1>Votre commande</h1>
    <button  id="deleteButton" class="basket-add" onclick="onClearStorage('${basket}')">Supprimer le panier</button> 
    ${products.map((product) => `
      <div class="commande-section">
        <img class="commande-image" src="${product.imageUrl}" alt="${product.name}">
        <section class="commande-text">
          <h3>${product.name}</h3>
          <h4>${product.lense}<h4>
          <p>${product.price / 100}€</p>
          <button  class="basket-add" onclick="onDelete('${product.uuid}')">supprimer</button>
        </section>
      </div>`
    )}
  `;
}
function onDelete(uuid) {
  /**
   * 1) Je récupère un identifiant UNIQUE de l'item à supprimer
   * 2) Je récupère le contenu de mon store dans une nouvelle variable
   * 3) Je supprime du contenu de cette variable, l'item en question
   * 4) Je remplace le store par la variable modifiée 
   */
  console.log(`Item to be deleted: `, uuid);
  const items = JSON.parse(localStorage.getItem('basket'));
  console.log(`Before deletion: `, items);
  const itemToDelete = items.find(i => i.uuid === uuid);
  const itemIndex = items.indexOf(itemToDelete);
  items.splice(itemIndex, 1);
  localStorage.setItem('basket', JSON.stringify(items));
  console.log(`After deletion: `, items);
  injectProducts(items);
  // console.log(JSON.parse(items));
  // console.log(`L'utilisateur souhaite supprimer le produit ${uuid}`);
  // alert('User asked for deletion process.');
}
function onClearStorage() {
  localStorage.clear();
  injectProducts([]);
  alert('clicked');
}
function showDeleteButton() {
  const deleteButton = document.getElementById('deleteButton');
  const basket = localStorage.getItem('basket');
  const products = basket ? JSON.parse(basket) : [];
   if(products.length > 1) {
    deleteButton.style.display = "block";
   } else {
    deleteButton.style.display = "none";
   }
}
/**
 * @param {array} products 
 */
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
/**
 * 
 * @param {string} email 
 * @returns 
 */
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

  // Je verifie que le localstorage n'est pas vide 
  const basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : null;
  console.log('contenu du basket:', basket);
  if(!basket || basket.length < 1) {
    alert('Veuillez remplir votre panier avant de commander !');
    return;
  }
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
    localStorage.clear();
  } else {
    console.log('error triggered');
    console.log(contact);
    console.log(products);
  }
});