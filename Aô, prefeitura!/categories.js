// Categorias e subcategorias para denúncias
const reportCategories = [
  {
    id: 'patrimonio',
    icon: 'fas fa-landmark',
    name: 'Patrimônio e Espaços Públicos',
    color: '#9c27b0',
    subcategories: [
      { id: 'pracas-abandonadas', name: 'Praças ou parques abandonados' },
      { id: 'equipamentos-quebrados', name: 'Equipamentos de lazer quebrados' }
    ]
  },
  {
    id: 'infraestrutura',
    icon: 'fas fa-city',
    name: 'Infraestrutura Urbana',
    color: '#ff9800',
    subcategories: [
      { id: 'buracos', name: 'Buracos nas ruas ou calçadas' },
      { id: 'asfalto-danificado', name: 'Asfalto danificado ou afundado' },
      { id: 'obras-abandonadas', name: 'Obras públicas abandonadas' },
      { id: 'acessibilidade', name: 'Falta de acessibilidade (rampas, calçadas irregulares)' }
    ]
  },
  {
    id: 'iluminacao',
    icon: 'fas fa-lightbulb',
    name: 'Iluminação Pública',
    color: '#ffc107',
    subcategories: [
      { id: 'postes-apagados', name: 'Postes de luz apagados' },
      { id: 'iluminacao-intermitente', name: 'Iluminação intermitente (piscando)' },
      { id: 'falta-iluminacao', name: 'Falta de iluminação em ruas, praças ou pontos de ônibus' }
    ]
  },
  {
    id: 'meio-ambiente',
    icon: 'fas fa-tree',
    name: 'Meio Ambiente e Natureza',
    color: '#4caf50',
    subcategories: [
      { id: 'queda-arvores', name: 'Queda ou risco de queda de árvores' },
      { id: 'arvores-fios', name: 'Árvores com galhos encostando em fios elétricos' },
      { id: 'lixo-terrenos', name: 'Lixo em locais públicos ou terrenos baldios' },
      { id: 'desmatamento', name: 'Desmatamento irregular ou queimadas' }
    ]
  },
  {
    id: 'limpeza',
    icon: 'fas fa-trash-alt',
    name: 'Limpeza e Coleta de Lixo',
    color: '#795548',
    subcategories: [
      { id: 'acumulo-lixo', name: 'Acúmulo de lixo nas ruas' },
      { id: 'falta-lixeiras', name: 'Falta de lixeiras públicas' },
      { id: 'falta-coleta', name: 'Falta de coleta seletiva' }
    ]
  },
  {
    id: 'saneamento',
    icon: 'fas fa-tint',
    name: 'Saneamento e Água',
    color: '#2196f3',
    subcategories: [
      { id: 'vazamentos', name: 'Vazamentos de água' },
      { id: 'esgoto', name: 'Esgoto a céu aberto' },
      { id: 'bueiros', name: 'Bueiros entupidos ou sem tampa' },
      { id: 'alagamentos', name: 'Alagamentos em dias de chuva' }
    ]
  },
  {
    id: 'transito',
    icon: 'fas fa-traffic-light',
    name: 'Trânsito e Transporte',
    color: '#f44336',
    subcategories: [
      { id: 'semaforos', name: 'Semáforos quebrados ou mal sincronizados' },
      { id: 'falta-sinalizacao', name: 'Falta de sinalização de trânsito' },
      { id: 'faixas-apagadas', name: 'Faixas de pedestre apagadas' }
    ]
  }
];

// Função para criar o modal de categorias
function createCategoriesModal() {
  const categoriesModal = document.createElement('div');
  categoriesModal.id = 'categories-modal';
  categoriesModal.className = 'modal';
  
  categoriesModal.innerHTML = `
    <div class="modal-content categories-content">
      <div class="modal-header">
        <h2><i class="fas fa-list-ul"></i> Selecione a Categoria</h2>
        <button class="close-btn" id="close-categories-modal">&times;</button>
      </div>
      <div class="categories-container">
        ${reportCategories.map(category => `
          <div class="category-card" data-category="${category.id}">
            <div class="category-icon" style="background-color: ${category.color}">
              <i class="${category.icon}"></i>
            </div>
            <div class="category-name">${category.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(categoriesModal);
  
  // Adicionar evento para fechar o modal
  document.getElementById('close-categories-modal').addEventListener('click', function() {
    document.getElementById('categories-modal').style.display = 'none';
  });
  
  // Adicionar eventos para as categorias
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const categoryId = this.dataset.category;
      const category = reportCategories.find(c => c.id === categoryId);
      
      if (category) {
        // Fechar modal de categorias
        document.getElementById('categories-modal').style.display = 'none';
        
        // Abrir modal de subcategorias
        openSubcategoriesModal(category);
      }
    });
  });
}

// Função para abrir o modal de subcategorias
function openSubcategoriesModal(category) {
  // Criar modal de subcategorias se não existir
  if (!document.getElementById('subcategories-modal')) {
    const subcategoriesModal = document.createElement('div');
    subcategoriesModal.id = 'subcategories-modal';
    subcategoriesModal.className = 'modal';
    
    subcategoriesModal.innerHTML = `
      <div class="modal-content subcategories-content">
        <div class="modal-header">
          <h2 id="subcategories-title"></h2>
          <button class="close-btn" id="close-subcategories-modal">&times;</button>
        </div>
        <div class="subcategories-container" id="subcategories-container">
          <!-- Conteúdo preenchido dinamicamente -->
        </div>
        <div class="modal-footer">
          <button class="back-btn" id="back-to-categories-btn">
            <i class="fas fa-arrow-left"></i> Voltar para categorias
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(subcategoriesModal);
    
    // Adicionar evento para fechar o modal
    document.getElementById('close-subcategories-modal').addEventListener('click', function() {
      document.getElementById('subcategories-modal').style.display = 'none';
    });
    
    // Adicionar evento para voltar para categorias
    document.getElementById('back-to-categories-btn').addEventListener('click', function() {
      document.getElementById('subcategories-modal').style.display = 'none';
      document.getElementById('categories-modal').style.display = 'flex';
    });
  }
  
  // Atualizar título
  document.getElementById('subcategories-title').innerHTML = `
    <i class="${category.icon}"></i> ${category.name}
  `;
  
  // Atualizar conteúdo
  const container = document.getElementById('subcategories-container');
  container.innerHTML = '';
  
  category.subcategories.forEach(subcategory => {
    const subcategoryItem = document.createElement('div');
    subcategoryItem.className = 'subcategory-item';
    subcategoryItem.dataset.category = category.id;
    subcategoryItem.dataset.subcategory = subcategory.id;
    
    subcategoryItem.innerHTML = `
      <div class="subcategory-name">${subcategory.name}</div>
      <i class="fas fa-chevron-right"></i>
    `;
    
    subcategoryItem.addEventListener('click', function() {
      const categoryId = this.dataset.category;
      const subcategoryId = this.dataset.subcategory;
      
      // Fechar modal de subcategorias
      document.getElementById('subcategories-modal').style.display = 'none';
      
      // Abrir formulário de denúncia com categoria e subcategoria selecionadas
      openReportFormWithCategory(categoryId, subcategoryId);
    });
    
    container.appendChild(subcategoryItem);
  });
  
  // Exibir modal
  document.getElementById('subcategories-modal').style.display = 'flex';
}

// Função para abrir o formulário de denúncia com categoria e subcategoria selecionadas
function openReportFormWithCategory(categoryId, subcategoryId) {
  const category = reportCategories.find(c => c.id === categoryId);
  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  
  // Atualizar título do modal
  const modalHeader = document.querySelector('#report-modal .modal-header h2');
  modalHeader.innerHTML = `<i class="${category.icon}"></i> Nova Denúncia: ${subcategory.name}`;
  
  // Armazenar categoria e subcategoria selecionadas
  document.getElementById('report-modal').dataset.category = categoryId;
  document.getElementById('report-modal').dataset.subcategory = subcategoryId;
  
  // Exibir o modal de denúncia
  document.getElementById('report-modal').style.display = 'flex';
  
  // Adicionar classe ao corpo para indicar que o modal está aberto
  document.body.classList.add('modal-open');
  
  // Destacar visualmente que o mapa está em modo de seleção
  document.getElementById('map').classList.add('map-selecting');
}

// Modificar a função openReportModal para abrir o modal de categorias
function openReportModal() {
  // Criar modal de categorias se não existir
  if (!document.getElementById('categories-modal')) {
    createCategoriesModal();
  }
  
  // Exibir modal de categorias
  document.getElementById('categories-modal').style.display = 'flex';
}

// Modificar a função submitReport para incluir categoria e subcategoria
function submitReport() {
  // Verificar se uma localização foi selecionada
  if (!selectedLocation) {
    alert('Por favor, selecione uma localização no mapa.');
    return;
  }
  
  // Obter valores do formulário
  const reportModal = document.getElementById('report-modal');
  const categoryId = reportModal.dataset.category;
  const subcategoryId = reportModal.dataset.subcategory;
  const description = document.getElementById('report-description').value;
  const address = document.getElementById('report-address').value;
  const urgency = document.getElementById('report-urgency').value;
  const contact = document.getElementById('report-contact').value;
  
  // Obter categoria e subcategoria
  const category = reportCategories.find(c => c.id === categoryId);
  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  
  // Criar nova denúncia
  const newReport = {
    id: mockReports.length + 1,
    type: categoryId,
    subtype: subcategoryId,
    title: subcategory.name,
    description: description,
    address: address,
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
  
  // Adicionar marcador ao mapa
  addReportMarker(newReport);
  
  // Fechar modal
  closeReportModal();
  
  // Mostrar mensagem de sucesso
  alert('Denúncia enviada com sucesso!');
  
  // Adicionar pontos ao usuário (simulação)
  if (typeof userRewards !== 'undefined') {
    userRewards.points += 50;
    userRewards.history.push({
      date: new Date().toISOString().split('T')[0],
      action: 'Denúncia enviada',
      points: 50
    });
    
    // Atualizar badge de pontos
    document.querySelector('.rewards-points-badge').textContent = userRewards.points;
  }
}
