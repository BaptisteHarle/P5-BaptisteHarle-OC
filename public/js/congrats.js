document.addEventListener('DOMContentLoaded', injectText);

function injectText() {
    const lastOrder = localStorage.getItem('lastOrder') ? JSON.parse(localStorage.getItem('lastOrder')) : null;
    if (lastOrder) {
        const container = document.getElementById('congrats-container');
        container.innerHTML = `
            <h3>Merci pour votre commande</h3>
            <p>
                Votre commande n° <b>${lastOrder.orderId}</b> est bien parvenue jusqu'a notre entrepôt. Nous avons prélevé le montant de <b>${lastOrder.price}</b> sur votre carte bancaire. Vous allez recevoir un mail de comfirmation.Votre commande sera livrée chez vous dans le plus court délai possible.
            </p>
            <a href="/">
                <button>Retour aux produits</button>
            </a>`;
    }
}