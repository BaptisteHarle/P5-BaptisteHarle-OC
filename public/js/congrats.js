document.addEventListener('DOMContentLoaded', () => {
    const basket = localStorage.getItem('basket');
    const order = basket ? JSON.parse(basket) : [];
    injectOrder(order);
});

function injectOrder(order) {
    const container = document.getElementById('congrats-container');
    container.innerHTML = `
  <h3>Merci pour votre commande</h3>
            <p>
                Votre commande est bien parvenue jusqu'a notre entrepôt. Vous allez recevoir un mail de comfirmation.Votre commande sera livrée chez vous dans le plus court délai possible.
            </p>
            <a href="/"><button>Retour aux produits</button></a>
  )}
`;
}