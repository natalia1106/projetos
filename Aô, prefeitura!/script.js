// Dados de exemplo para denúncias
const mockReports = [
  {
    id: 1,
    type: 'buraco',
    title: 'Buraco na Rua',
    description: 'Buraco grande na via que está causando acidentes',
    location: { lat: -23.4273, lng: -51.9375 }, // Maringá - Av. Colombo
    status: 'pending',
    date: '2025-05-15',
    urgency: 'alta',
    contact: 'joao@email.com',
    timeline: [
      { date: '2025-05-15', title: 'Denúncia Registrada', description: 'Denúncia enviada pelo cidadão' }
    ]
  },
  {
    id: 2,
    type: 'iluminacao',
    title: 'Falta de Iluminação',
    description: 'Poste com lâmpada queimada há mais de 2 semanas',
    location: { lat: -23.4219, lng: -51.9432 }, // Maringá - Zona 7
    status: 'in-progress',
    date: '2025-05-10',
    urgency: 'media',
    contact: 'maria@email.com',
    timeline: [
      { date: '2025-05-10', title: 'Denúncia Registrada', description: 'Denúncia enviada pelo cidadão' },
      { date: '2025-05-12', title: 'Em Análise', description: 'Equipe técnica está avaliando o problema' },
      { date: '2025-05-18', title: 'Em Andamento', description: 'Equipe enviada para o local' }
    ]
  },
  {
    id: 3,
    type: 'lixo',
    title: 'Acúmulo de Lixo',
    description: 'Lixo acumulado na calçada atraindo insetos e roedores',
    location: { lat: -23.4105, lng: -51.9305 }, // Maringá - Centro
    status: 'completed',
    date: '2025-05-05',
    urgency: 'media',
    contact: 'carlos@email.com',
    timeline: [
      { date: '2025-05-05', title: 'Denúncia Registrada', description: 'Denúncia enviada pelo cidadão' },
      { date: '2025-05-06', title: 'Em Análise', description: 'Equipe técnica está avaliando o problema' },
      { date: '2025-05-08', title: 'Em Andamento', description: 'Equipe de limpeza enviada para o local' },
      { date: '2025-05-10', title: 'Concluído', description: 'Área limpa e higienizada' }
    ]
  },
  {
    id: 4,
    type: 'agua',
    title: 'Vazamento de Água',
    description: 'Vazamento constante na calçada, desperdiçando água',
    location: { lat: -23.4312, lng: -51.9189 }, // Maringá - Zona 2
    status: 'in-progress',
    date: '2025-05-12',
    urgency: 'alta',
    contact: 'ana@email.com',
    timeline: [
      { date: '2025-05-12', title: 'Denúncia Registrada', description: 'Denúncia enviada pelo cidadão' },
      { date: '2025-05-14', title: 'Em Análise', description: 'Equipe técnica está avaliando o problema' },
      { date: '2025-05-19', title: 'Em Andamento', description: 'Equipe enviada para o local' }
    ]
  },
  {
    id: 5,
    type: 'esgoto',
    title: 'Esgoto a Céu Aberto',
    description: 'Esgoto vazando na rua causando mau cheiro',
    location: { lat: -23.4401, lng: -51.9278 }, // Maringá - Jardim Alvorada
    status: 'pending',
    date: '2025-05-20',
    urgency: 'emergencia',
    contact: 'pedro@email.com',
    timeline: [
      { date: '2025-05-20', title: 'Denúncia Registrada', description: 'Denúncia enviada pelo cidadão' }
    ]
  }
];

// Inicialização do mapa
let map;
let currentMarker = null;
let reportMarkers = [];
let currentFilter = 'all';
let selectedLocation = null;

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar o mapa
  initMap();
  
  // Adicionar eventos aos botões
  setupEventListeners();
  
  // Carregar denúncias no mapa
  loadReports();
});

function initMap() {
  // Coordenadas iniciais (Maringá - Centro)
  const initialCoords = [-23.4220, -51.9330];
  
  // Criar o mapa
  map = L.map('map').setView(initialCoords, 13);
  
  // Adicionar camada de mapa (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  
  // Adicionar evento de clique no mapa para selecionar localização
  map.on('click', function(e) {
    const reportModal = document.getElementById('report-modal');
    if (reportModal && reportModal.style.display === 'flex') {
      // Garantir que o modal está aberto e visível
      setReportLocation(e.latlng);
      
      // Centralizar o mapa na localização selecionada
      map.setView(e.latlng, map.getZoom());
      
      // Adicionar uma animação para destacar o ponto selecionado
      const pulsingIcon = L.divIcon({
        className: 'pulsing-icon',
        html: '<div class="pulse"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      
      // Atualizar o marcador com o ícone pulsante
      if (currentMarker) {
        map.removeLayer(currentMarker);
      }
      
      currentMarker = L.marker(e.latlng, { icon: pulsingIcon }).addTo(map);
    }
  });
  
  // Adicionar pontos de coleta ao mapa
  addRecyclingPointsToMap(map);
}

function setupEventListeners() {
  // Botão de menu mobile
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });
  
  // Botão de denúncia
  document.getElementById('report-btn').addEventListener('click', openReportModal);
  document.getElementById('mobile-report-btn').addEventListener('click', openReportModal);
  
  // Fechar modal de denúncia
  document.getElementById('close-modal').addEventListener('click', closeReportModal);
  
  // Fechar modal de detalhes
  document.getElementById('close-details-modal').addEventListener('click', function() {
    document.getElementById('details-modal').style.display = 'none';
  });
  
  // Fechar modal de notificações
  document.getElementById('close-notifications-modal').addEventListener('click', function() {
    document.getElementById('notifications-modal').style.display = 'none';
  });
  
  // Fechar modal de relatório de denúncias
  document.getElementById('close-report-list-modal').addEventListener('click', function() {
    document.getElementById('report-list-modal').style.display = 'none';
  });
  
  // Botão de notificações
  document.getElementById('notification-btn').addEventListener('click', function() {
    document.getElementById('notifications-modal').style.display = 'flex';
  });
  
  // Marcar todas notificações como lidas
  document.getElementById('mark-all-read-btn').addEventListener('click', function() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
      item.classList.remove('unread');
    });
    document.querySelector('.notification-badge').style.display = 'none';
  });
  
  // Formulário de denúncia
  document.getElementById('report-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitReport();
  });
  
  // Botões de filtro
  document.getElementById('all-reports-btn').addEventListener('click', function() {
    setActiveFilter('all');
    filterReports('all');
  });
  
  document.getElementById('pending-btn').addEventListener('click', function() {
    setActiveFilter('pending');
    filterReports('pending');
    showReportList('pending');
  });
  
  document.getElementById('analysis-btn').addEventListener('click', function() {
    setActiveFilter('analysis');
    filterReports('analysis');
    showReportList('analysis');
  });
  
  document.getElementById('progress-btn').addEventListener('click', function() {
    setActiveFilter('in-progress');
    filterReports('in-progress');
    showReportList('in-progress');
  });
  
  document.getElementById('completed-btn').addEventListener('click', function() {
    setActiveFilter('completed');
    filterReports('completed');
    showReportList('completed');
  });
}

function openReportModal() {
  document.getElementById('report-modal').style.display = 'flex';
  document.getElementById('report-location').value = '';
  document.getElementById('report-form').reset();
  
  // Adicionar classe ao corpo para indicar que o modal está aberto
  document.body.classList.add('modal-open');
  
  // Destacar visualmente que o mapa está em modo de seleção
  document.getElementById('map').classList.add('map-selecting');
}

function closeReportModal() {
  document.getElementById('report-modal').style.display = 'none';
  
  // Remover o marcador temporário se existir
  if (currentMarker) {
    map.removeLayer(currentMarker);
    currentMarker = null;
  }
  
  // Remover classe do corpo
  document.body.classList.remove('modal-open');
  
  // Remover a instrução visual e o destaque do mapa
  const instruction = document.getElementById('map-instruction');
  if (instruction) {
    instruction.remove();
  }
  
  document.getElementById('map').classList.remove('map-selecting');
  
  // Resetar a localização selecionada
  selectedLocation = null;
}

function setReportLocation(latlng) {
  // Atualizar o campo de localização
  document.getElementById('report-location').value = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
  
  // Remover marcador anterior se existir
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  
  // Adicionar novo marcador
  currentMarker = L.marker(latlng).addTo(map);
  
  // Armazenar a localização selecionada
  selectedLocation = latlng;
  
  // Remover a instrução visual quando a localização for selecionada
  const instruction = document.getElementById('map-instruction');
  if (instruction) {
    instruction.remove();
  }
  
  // Adicionar uma confirmação visual
  const locationHelp = document.getElementById('location-help');
  locationHelp.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i> Localização selecionada com sucesso!';
}

function submitReport() {
  // Verificar se uma localização foi selecionada
  if (!selectedLocation) {
    alert('Por favor, selecione uma localização no mapa.');
    return;
  }
  
  // Obter valores do formulário
  const type = document.getElementById('report-type').value;
  const description = document.getElementById('report-description').value;
  const urgency = document.getElementById('report-urgency').value;
  const contact = document.getElementById('report-contact').value;
  
  // Criar nova denúncia
  const newReport = {
    id: mockReports.length + 1,
    type: type,
    title: getReportTitle(type),
    description: description,
    location: { lat: selectedLocation.lat, lng: selectedLocation.lng },
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    urgency: urgency,
    contact: contact,
    timeline: [
      { 
        date: new Date().toISOString().split('T')[0], 
        title: 'Denúncia Registrada', 
        description: 'Denúncia enviada pelo cidadão' 
      }
    ]
  };
  
  // Adicionar à lista de denúncias
  mockReports.push(newReport);
  
  // Adicionar ao mapa
  addReportMarker(newReport);
  
  // Fechar o modal
  closeReportModal();
  
  // Mostrar confirmação
  alert('Denúncia enviada com sucesso! Acompanhe o status pelo mapa.');
}

function getReportTitle(type) {
  const titles = {
    'lixo': 'Acúmulo de Lixo',
    'buraco': 'Buraco na Rua',
    'iluminacao': 'Falta de Iluminação',
    'agua': 'Vazamento de Água',
    'esgoto': 'Esgoto a Céu Aberto',
    'parque': 'Problema em Parque',
    'outro': 'Outro Problema'
  };
  
  return titles[type] || 'Problema Urbano';
}

function loadReports() {
  // Limpar marcadores existentes
  clearReportMarkers();
  
  // Adicionar marcadores para cada denúncia
  mockReports.forEach(report => {
    addReportMarker(report);
  });
}

function addReportMarker(report) {
  // Definir ícone com base no status
  const icon = getStatusIcon(report.status);
  
  // Criar marcador
  const marker = L.marker([report.location.lat, report.location.lng], { icon: icon })
    .addTo(map)
    .bindPopup(createPopupContent(report));
  
  // Adicionar evento de clique para mostrar detalhes
  marker.on('click', function() {
    showReportDetails(report);
  });
  
  // Armazenar referência ao marcador
  reportMarkers.push({
    marker: marker,
    report: report
  });
}

function getStatusIcon(status) {
  // Definir ícones com base no status
  let iconUrl, iconColor;
  
  switch(status) {
    case 'pending':
      iconColor = '#ff9800'; // Laranja
      break;
    case 'in-progress':
      iconColor = '#2196f3'; // Azul
      break;
    case 'completed':
      iconColor = '#4caf50'; // Verde
      break;
    default:
      iconColor = '#ff9800';
  }
  
  // Criar ícone personalizado
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${iconColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

function createPopupContent(report) {
  // Definir classe de status
  let statusClass, statusText;
  
  switch(report.status) {
    case 'pending':
      statusClass = 'status-pending';
      statusText = 'Pendente';
      break;
    case 'in-progress':
      statusClass = 'status-in-progress';
      statusText = 'Em Andamento';
      break;
    case 'completed':
      statusClass = 'status-completed';
      statusText = 'Concluído';
      break;
    default:
      statusClass = 'status-pending';
      statusText = 'Pendente';
  }
  
  // Criar conteúdo do popup
  return `
    <div class="custom-popup">
      <div class="popup-title">${report.title}</div>
      <div class="popup-status ${statusClass}">${statusText}</div>
      <div class="popup-date">Reportado em: ${formatDate(report.date)}</div>
      <div class="popup-description">${report.description.substring(0, 50)}${report.description.length > 50 ? '...' : ''}</div>
      <div class="popup-actions">
        <button class="popup-btn popup-btn-primary" onclick="showReportDetails(${report.id})">Ver Detalhes</button>
      </div>
    </div>
  `;
}

function showReportDetails(reportId) {
  // Encontrar a denúncia pelo ID
  let report;
  if (typeof reportId === 'object') {
    report = reportId;
  } else {
    report = mockReports.find(r => r.id === reportId);
  }
  
  if (!report) return;
  
  // Definir classe de status
  let statusClass, statusText;
  
  switch(report.status) {
    case 'pending':
      statusClass = 'status-pending';
      statusText = 'Pendente';
      break;
    case 'in-progress':
      statusClass = 'status-in-progress';
      statusText = 'Em Andamento';
      break;
    case 'completed':
      statusClass = 'status-completed';
      statusText = 'Concluído';
      break;
    default:
      statusClass = 'status-pending';
      statusText = 'Pendente';
  }
  
  // Criar conteúdo HTML para os detalhes
  let timelineHTML = '';
  report.timeline.forEach(item => {
    timelineHTML += `
      <div class="timeline-item">
        <div class="timeline-date">${formatDate(item.date)}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-description">${item.description}</div>
      </div>
    `;
  });
  
  const detailsHTML = `
    <div class="report-detail-item">
      <div class="report-detail-label">Tipo de Problema</div>
      <div class="report-detail-value">${report.title}</div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Status</div>
      <div class="report-detail-value"><span class="popup-status ${statusClass}">${statusText}</span></div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Data da Denúncia</div>
      <div class="report-detail-value">${formatDate(report.date)}</div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Urgência</div>
      <div class="report-detail-value">${formatUrgency(report.urgency)}</div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Descrição</div>
      <div class="report-detail-value">${report.description}</div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Localização</div>
      <div class="report-detail-value">Lat: ${report.location.lat.toFixed(6)}, Lng: ${report.location.lng.toFixed(6)}</div>
    </div>
    <div class="report-detail-item">
      <div class="report-detail-label">Histórico</div>
      <div class="report-timeline">
        ${timelineHTML}
      </div>
    </div>
  `;
  
  // Atualizar o conteúdo do modal
  document.getElementById('report-details-content').innerHTML = detailsHTML;
  
  // Exibir o modal
  document.getElementById('details-modal').style.display = 'flex';
}

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function formatUrgency(urgency) {
  const urgencyMap = {
    'baixa': 'Baixa',
    'media': 'Média',
    'alta': 'Alta',
    'emergencia': 'Emergência'
  };
  
  return urgencyMap[urgency] || urgency;
}

function clearReportMarkers() {
  // Remover todos os marcadores do mapa
  reportMarkers.forEach(item => {
    map.removeLayer(item.marker);
  });
  
  // Limpar array
  reportMarkers = [];
}

function filterReports(filter) {
  // Limpar marcadores existentes
  clearReportMarkers();
  
  // Filtrar denúncias
  let filteredReports;
  
  switch(filter) {
    case 'all':
      filteredReports = mockReports;
      break;
    case 'pending':
      filteredReports = mockReports.filter(report => report.status === 'pending');
      break;
    case 'analysis':
      // Considerando que denúncias em análise são as que têm timeline com "Em Análise"
      filteredReports = mockReports.filter(report => 
        report.timeline.some(item => item.title.includes('Análise'))
      );
      break;
    case 'in-progress':
      filteredReports = mockReports.filter(report => report.status === 'in-progress');
      break;
    case 'completed':
      filteredReports = mockReports.filter(report => report.status === 'completed');
      break;
    default:
      filteredReports = mockReports;
  }
  
  // Adicionar marcadores filtrados
  filteredReports.forEach(report => {
    addReportMarker(report);
  });
  
  // Atualizar filtro atual
  currentFilter = filter;
}

function setActiveFilter(filter) {
  // Remover classe ativa de todos os botões
  document.querySelectorAll('.sidebar button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Adicionar classe ativa ao botão selecionado
  switch(filter) {
    case 'all':
      document.getElementById('all-reports-btn').classList.add('active');
      break;
    case 'pending':
      document.getElementById('pending-btn').classList.add('active');
      break;
    case 'analysis':
      document.getElementById('analysis-btn').classList.add('active');
      break;
    case 'in-progress':
      document.getElementById('progress-btn').classList.add('active');
      break;
    case 'completed':
      document.getElementById('completed-btn').classList.add('active');
      break;
  }
}

// Função para mostrar relatório de denúncias
function showReportList(status) {
  // Criar modal de relatório se não existir
  if (!document.getElementById('report-list-modal')) {
    const reportListModal = document.createElement('div');
    reportListModal.id = 'report-list-modal';
    reportListModal.className = 'modal';
    
    reportListModal.innerHTML = `
      <div class="modal-content report-list-content">
        <div class="modal-header">
          <h2><i class="fas fa-list"></i> <span id="report-list-title">Relatório de Denúncias</span></h2>
          <button class="close-btn" id="close-report-list-modal">&times;</button>
        </div>
        <div id="report-list-container">
          <!-- Conteúdo preenchido dinamicamente -->
        </div>
      </div>
    `;
    
    document.body.appendChild(reportListModal);
    
    // Adicionar evento para fechar o modal
    document.getElementById('close-report-list-modal').addEventListener('click', function() {
      document.getElementById('report-list-modal').style.display = 'none';
    });
  }
  
  // Filtrar denúncias conforme o status
  let filteredReports;
  let statusTitle;
  
  switch(status) {
    case 'pending':
      filteredReports = mockReports.filter(report => report.status === 'pending');
      statusTitle = 'Denúncias Pendentes';
      break;
    case 'analysis':
      filteredReports = mockReports.filter(report => 
        report.timeline.some(item => item.title.includes('Análise'))
      );
      statusTitle = 'Denúncias em Análise';
      break;
    case 'in-progress':
      filteredReports = mockReports.filter(report => report.status === 'in-progress');
      statusTitle = 'Denúncias em Andamento';
      break;
    case 'completed':
      filteredReports = mockReports.filter(report => report.status === 'completed');
      statusTitle = 'Denúncias Concluídas';
      break;
    default:
      filteredReports = mockReports;
      statusTitle = 'Todas as Denúncias';
  }
  
  // Atualizar título do relatório
  document.getElementById('report-list-title').textContent = statusTitle;
  
  // Gerar HTML para a lista de denúncias
  let reportsHTML = '';
  
  if (filteredReports.length === 0) {
    reportsHTML = '<div class="no-reports">Nenhuma denúncia encontrada nesta categoria.</div>';
  } else {
    reportsHTML = '<div class="report-list">';
    
    filteredReports.forEach(report => {
      // Definir classe de status
      let statusClass, statusText;
      
      switch(report.status) {
        case 'pending':
          statusClass = 'status-pending';
          statusText = 'Pendente';
          break;
        case 'in-progress':
          statusClass = 'status-in-progress';
          statusText = 'Em Andamento';
          break;
        case 'completed':
          statusClass = 'status-completed';
          statusText = 'Concluído';
          break;
        default:
          statusClass = 'status-pending';
          statusText = 'Pendente';
      }
      
      reportsHTML += `
        <div class="report-list-item">
          <div class="report-list-header">
            <div class="report-list-title">${report.title}</div>
            <div class="report-list-status ${statusClass}">${statusText}</div>
          </div>
          <div class="report-list-date">Reportado em: ${formatDate(report.date)}</div>
          <div class="report-list-description">${report.description.substring(0, 100)}${report.description.length > 100 ? '...' : ''}</div>
          <div class="report-list-urgency">Urgência: ${formatUrgency(report.urgency)}</div>
          <div class="report-list-actions">
            <button class="popup-btn popup-btn-primary" onclick="showReportDetails(${report.id})">Ver Detalhes</button>
            <button class="popup-btn popup-btn-secondary" onclick="centerMapOnReport(${report.id})">Ver no Mapa</button>
          </div>
        </div>
      `;
    });
    
    reportsHTML += '</div>';
  }
  
  // Atualizar o conteúdo do modal
  document.getElementById('report-list-container').innerHTML = reportsHTML;
  
  // Exibir o modal
  document.getElementById('report-list-modal').style.display = 'flex';
}

// Função para centralizar o mapa em uma denúncia específica
function centerMapOnReport(reportId) {
  const report = mockReports.find(r => r.id === reportId);
  
  if (report) {
    // Fechar o modal de relatório
    document.getElementById('report-list-modal').style.display = 'none';
    
    // Centralizar o mapa na localização da denúncia
    map.setView([report.location.lat, report.location.lng], 16);
    
    // Encontrar e abrir o popup do marcador
    reportMarkers.forEach(item => {
      if (item.report.id === reportId) {
        item.marker.openPopup();
      }
    });
  }
}
