// Pontos de coleta de lixo reciclável e eletrônicos em Maringá
const recyclingPoints = [
  {
    id: 1,
    name: "Ecoponto Zona Norte",
    type: "recyclable",
    description: "Coleta de materiais recicláveis como papel, plástico, vidro e metal",
    address: "Av. Colombo, 8000 - Zona 7, Maringá - PR",
    location: { lat: -23.4053, lng: -51.9386 },
    hours: "Segunda a Sábado: 8h às 17h",
    phone: "(44) 3221-1234",
    items: ["Papel", "Plástico", "Vidro", "Metal"]
  },
  {
    id: 2,
    name: "Ecoponto Zona Sul",
    type: "recyclable",
    description: "Coleta de materiais recicláveis como papel, plástico, vidro e metal",
    address: "Av. Nildo Ribeiro da Rocha, 5000 - Jardim Alvorada, Maringá - PR",
    location: { lat: -23.4412, lng: -51.9278 },
    hours: "Segunda a Sábado: 8h às 17h",
    phone: "(44) 3221-5678",
    items: ["Papel", "Plástico", "Vidro", "Metal"]
  },
  {
    id: 3,
    name: "Ecoponto Zona Leste",
    type: "recyclable",
    description: "Coleta de materiais recicláveis como papel, plástico, vidro e metal",
    address: "Av. Morangueira, 2500 - Zona 8, Maringá - PR",
    location: { lat: -23.4150, lng: -51.9150 },
    hours: "Segunda a Sábado: 8h às 17h",
    phone: "(44) 3221-9012",
    items: ["Papel", "Plástico", "Vidro", "Metal"]
  },
  {
    id: 4,
    name: "Ecoponto Zona Oeste",
    type: "recyclable",
    description: "Coleta de materiais recicláveis como papel, plástico, vidro e metal",
    address: "Av. Mandacaru, 3800 - Parque das Grevíleas, Maringá - PR",
    location: { lat: -23.4250, lng: -51.9550 },
    hours: "Segunda a Sábado: 8h às 17h",
    phone: "(44) 3221-3456",
    items: ["Papel", "Plástico", "Vidro", "Metal"]
  },
  {
    id: 5,
    name: "Descarte Eletrônicos Centro",
    type: "electronic",
    description: "Ponto de coleta especializado em lixo eletrônico",
    address: "Av. Brasil, 4000 - Centro, Maringá - PR",
    location: { lat: -23.4220, lng: -51.9330 },
    hours: "Segunda a Sexta: 9h às 18h, Sábado: 9h às 13h",
    phone: "(44) 3025-7890",
    items: ["Computadores", "Celulares", "Eletrodomésticos", "Baterias", "Pilhas"]
  },
  {
    id: 6,
    name: "TecRecicle",
    type: "electronic",
    description: "Empresa especializada em reciclagem de equipamentos eletrônicos",
    address: "Rua Santos Dumont, 2800 - Zona 1, Maringá - PR",
    location: { lat: -23.4180, lng: -51.9280 },
    hours: "Segunda a Sexta: 8h30 às 17h30",
    phone: "(44) 3028-1234",
    items: ["Computadores", "Impressoras", "Monitores", "Celulares", "Tablets"]
  },
  {
    id: 7,
    name: "EcoEletrônicos",
    type: "electronic",
    description: "Coleta e reciclagem de equipamentos eletrônicos e componentes",
    address: "Av. Guedner, 1500 - Jardim Aclimação, Maringá - PR",
    location: { lat: -23.4320, lng: -51.9420 },
    hours: "Segunda a Sexta: 9h às 18h",
    phone: "(44) 3029-5678",
    items: ["Eletrônicos", "Cabos", "Baterias", "Pilhas", "Lâmpadas"]
  },
  {
    id: 8,
    name: "Cooperativa de Reciclagem Maringá",
    type: "recyclable",
    description: "Cooperativa que realiza coleta seletiva e reciclagem de diversos materiais",
    address: "Rua Pioneiro José Demori, 1000 - Jardim Alvorada, Maringá - PR",
    location: { lat: -23.4380, lng: -51.9350 },
    hours: "Segunda a Sexta: 8h às 17h",
    phone: "(44) 3226-7890",
    items: ["Papel", "Papelão", "Plástico", "Vidro", "Metal", "Óleo de cozinha"]
  },
  {
    id: 9,
    name: "Supermercado Cidade Canção - Ponto de Coleta",
    type: "recyclable",
    description: "Ponto de coleta de materiais recicláveis no estacionamento do supermercado",
    address: "Av. São Paulo, 1200 - Zona 2, Maringá - PR",
    location: { lat: -23.4190, lng: -51.9250 },
    hours: "Todos os dias: 8h às 22h",
    phone: "(44) 3221-0123",
    items: ["Papel", "Plástico", "Metal", "Vidro", "Óleo de cozinha"]
  },
  {
    id: 10,
    name: "Shopping Avenida Center - E-Lixo",
    type: "electronic",
    description: "Ponto de coleta de lixo eletrônico localizado no shopping",
    address: "Av. São Paulo, 2500 - Zona 3, Maringá - PR",
    location: { lat: -23.4230, lng: -51.9270 },
    hours: "Segunda a Sábado: 10h às 22h, Domingo: 14h às 20h",
    phone: "(44) 3027-5678",
    items: ["Celulares", "Baterias", "Pilhas", "Pequenos eletrônicos"]
  }
];

// Função para adicionar pontos de coleta ao mapa
function addRecyclingPointsToMap(map) {
  // Ícones personalizados para os diferentes tipos de pontos de coleta
  const recycleIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #4caf50; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"><i class="fas fa-recycle" style="display:none;"></i></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
  
  const electronicIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #2196f3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"><i class="fas fa-laptop" style="display:none;"></i></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
  
  // Adicionar cada ponto de coleta ao mapa
  recyclingPoints.forEach(point => {
    const icon = point.type === 'recyclable' ? recycleIcon : electronicIcon;
    
    const marker = L.marker([point.location.lat, point.location.lng], { icon: icon })
      .addTo(map)
      .bindPopup(createRecyclingPointPopup(point));
  });
  
  // Adicionar legenda para pontos de coleta
  if (!document.getElementById('recycling-legend')) {
    const legend = document.createElement('div');
    legend.id = 'recycling-legend';
    legend.className = 'recycling-legend';
    legend.innerHTML = `
      <div class="legend-title">Pontos de Coleta</div>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #4caf50;"></span>
        <span class="legend-text">Materiais Recicláveis</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #2196f3;"></span>
        <span class="legend-text">Lixo Eletrônico</span>
      </div>
    `;
    document.querySelector('.map-container').appendChild(legend);
  }
}

// Função para criar o conteúdo do popup para pontos de coleta
function createRecyclingPointPopup(point) {
  const itemsList = point.items.map(item => `<span class="item-tag">${item}</span>`).join('');
  
  return `
    <div class="recycling-popup">
      <div class="recycling-popup-title">${point.name}</div>
      <div class="recycling-popup-type ${point.type === 'recyclable' ? 'type-recyclable' : 'type-electronic'}">
        ${point.type === 'recyclable' ? 'Materiais Recicláveis' : 'Lixo Eletrônico'}
      </div>
      <div class="recycling-popup-description">${point.description}</div>
      <div class="recycling-popup-info">
        <div><i class="fas fa-map-marker-alt"></i> ${point.address}</div>
        <div><i class="fas fa-clock"></i> ${point.hours}</div>
        <div><i class="fas fa-phone"></i> ${point.phone}</div>
      </div>
      <div class="recycling-popup-items">
        <div class="items-title">Itens aceitos:</div>
        <div class="items-list">${itemsList}</div>
      </div>
      <div class="recycling-popup-actions">
        <button class="popup-btn popup-btn-primary" onclick="showDirections(${point.location.lat}, ${point.location.lng})">
          <i class="fas fa-directions"></i> Como Chegar
        </button>
      </div>
    </div>
  `;
}

// Função para mostrar direções até o ponto de coleta
function showDirections(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}
