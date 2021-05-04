document.addEventListener('DOMContentLoaded', async () => {
  // Récupération des données depuis le serveur
  const cameras = await NetworkInterface.get('http://localhost:3000/api/cameras');
  appendCameras(cameras);
});
function appendCameras(cameras) {
  const grid = document.getElementById('grid');
  cameras.forEach(camera => {
    const cameraElement = document.createElement('div');
    cameraElement.classList.add('grid-element');
    cameraElement.innerHTML = `
      <img src="${camera.imageUrl}" alt="${camera.name}">
      <div class="element-container">
        <div class="text-container">
          <p>${camera.name}</p>
          <p>${camera.price / 100},00 €</p>
        </div>
        <a href="/product/${camera._id}" class="details">
          Détails
        </a>
      </div>
    `;
    grid.appendChild(cameraElement);
  });
}