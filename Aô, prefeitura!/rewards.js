// Sistema de recompensas
const userRewards = {
  points: 350, // Pontos do usuário
  level: 2,    // Nível do usuário
  history: [
    { date: '2025-05-10', action: 'Denúncia enviada', points: 50 },
    { date: '2025-05-12', action: 'Denúncia confirmada', points: 100 },
    { date: '2025-05-15', action: 'Compartilhamento em redes sociais', points: 30 },
    { date: '2025-05-18', action: 'Denúncia resolvida', points: 150 },
    { date: '2025-05-20', action: 'Feedback enviado', points: 20 }
  ]
};

// Recompensas disponíveis
const availableRewards = [
  {
    id: 1,
    name: 'Copo Ecológico',
    description: 'Copo reutilizável de fibra de bambu com tampa',
    points: 300,
    image: 'images/rewards/eco-cup.jpg',
    available: true,
    category: 'sustentável'
  },
  {
    id: 2,
    name: 'Caneca Térmica',
    description: 'Caneca térmica de aço inoxidável com logo da cidade',
    points: 500,
    image: 'images/rewards/thermal-mug.jpg',
    available: false,
    category: 'sustentável'
  },
  {
    id: 3,
    name: 'Kit Ecológico',
    description: 'Kit com canudo, talheres e escova de dentes de bambu',
    points: 450,
    image: 'images/rewards/eco-kit.jpg',
    available: true,
    category: 'sustentável'
  },
  {
    id: 4,
    name: 'Desconto em IPTU',
    description: '5% de desconto no IPTU do próximo ano',
    points: 1000,
    image: 'images/rewards/tax-discount.jpg',
    available: true,
    category: 'financeiro'
  },
  {
    id: 5,
    name: 'Ingresso para Parque Municipal',
    description: 'Entrada gratuita para o Parque do Ingá',
    points: 200,
    image: 'images/rewards/park-ticket.jpg',
    available: true,
    category: 'lazer'
  },
  {
    id: 6,
    name: 'Copo Comemorativo',
    description: 'Copo comemorativo dos 77 anos de Maringá',
    points: 250,
    image: 'images/rewards/commemorative-cup.jpg',
    available: true,
    category: 'colecionável'
  }
];

// Função para abrir o modal de recompensas
function openRewardsModal() {
  // Criar modal de recompensas se não existir
  if (!document.getElementById('rewards-modal')) {
    createRewardsModal();
  }
  
  // Preencher o modal com as recompensas disponíveis
  updateRewardsContent();
  
  // Exibir o modal
  document.getElementById('rewards-modal').style.display = 'flex';
}

// Função para criar o modal de recompensas
function createRewardsModal() {
  const rewardsModal = document.createElement('div');
  rewardsModal.id = 'rewards-modal';
  rewardsModal.className = 'modal';
  
  rewardsModal.innerHTML = `
    <div class="modal-content rewards-content">
      <div class="modal-header">
        <h2><i class="fas fa-gift"></i> Recompensas</h2>
        <button class="close-btn" id="close-rewards-modal">&times;</button>
      </div>
      
      <div class="rewards-user-info">
        <div class="rewards-points">
          <i class="fas fa-star"></i>
          <span id="user-points">${userRewards.points}</span> pontos
        </div>
        <div class="rewards-level">
          Nível <span id="user-level">${userRewards.level}</span>
        </div>
      </div>
      
      <div class="rewards-tabs">
        <button class="rewards-tab-btn active" data-tab="available">Disponíveis</button>
        <button class="rewards-tab-btn" data-tab="redeemed">Resgatados</button>
        <button class="rewards-tab-btn" data-tab="history">Histórico</button>
      </div>
      
      <div class="rewards-container" id="rewards-container">
        <!-- Conteúdo preenchido dinamicamente -->
      </div>
    </div>
  `;
  
  document.body.appendChild(rewardsModal);
  
  // Adicionar evento para fechar o modal
  document.getElementById('close-rewards-modal').addEventListener('click', function() {
    document.getElementById('rewards-modal').style.display = 'none';
  });
  
  // Adicionar eventos para as abas
  document.querySelectorAll('.rewards-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remover classe ativa de todos os botões
      document.querySelectorAll('.rewards-tab-btn').forEach(b => {
        b.classList.remove('active');
      });
      
      // Adicionar classe ativa ao botão clicado
      this.classList.add('active');
      
      // Atualizar conteúdo com base na aba selecionada
      updateRewardsContent(this.dataset.tab);
    });
  });
}

// Função para atualizar o conteúdo do modal de recompensas
function updateRewardsContent(tab = 'available') {
  const container = document.getElementById('rewards-container');
  
  // Limpar conteúdo atual
  container.innerHTML = '';
  
  switch(tab) {
    case 'available':
      // Mostrar recompensas disponíveis
      container.innerHTML = `
        <div class="rewards-filter">
          <span>Filtrar por: </span>
          <button class="filter-btn active" data-filter="all">Todos</button>
          <button class="filter-btn" data-filter="sustentável">Sustentáveis</button>
          <button class="filter-btn" data-filter="financeiro">Financeiros</button>
          <button class="filter-btn" data-filter="lazer">Lazer</button>
        </div>
        <div class="rewards-grid" id="rewards-grid">
          ${generateRewardsGrid(availableRewards)}
        </div>
      `;
      
      // Adicionar eventos para os botões de filtro
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          // Remover classe ativa de todos os botões
          document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
          });
          
          // Adicionar classe ativa ao botão clicado
          this.classList.add('active');
          
          // Filtrar recompensas
          const filter = this.dataset.filter;
          const filteredRewards = filter === 'all' 
            ? availableRewards 
            : availableRewards.filter(reward => reward.category === filter);
          
          // Atualizar grid
          document.getElementById('rewards-grid').innerHTML = generateRewardsGrid(filteredRewards);
          
          // Readicionar eventos para os botões de resgate
          addRedeemEvents();
        });
      });
      
      // Adicionar eventos para os botões de resgate
      addRedeemEvents();
      break;
      
    case 'redeemed':
      // Mostrar recompensas resgatadas (placeholder)
      container.innerHTML = `
        <div class="rewards-empty">
          <i class="fas fa-box-open"></i>
          <p>Você ainda não resgatou nenhuma recompensa.</p>
          <button class="rewards-btn" onclick="document.querySelector('.rewards-tab-btn[data-tab=\\'available\\']').click()">
            Ver recompensas disponíveis
          </button>
        </div>
      `;
      break;
      
    case 'history':
      // Mostrar histórico de pontos
      container.innerHTML = `
        <div class="rewards-history">
          <h3>Histórico de Pontos</h3>
          <div class="history-list">
            ${userRewards.history.map(item => `
              <div class="history-item">
                <div class="history-date">${formatDate(item.date)}</div>
                <div class="history-action">${item.action}</div>
                <div class="history-points">+${item.points}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;
  }
}

// Função para gerar o grid de recompensas
function generateRewardsGrid(rewards) {
  if (rewards.length === 0) {
    return `
      <div class="rewards-empty">
        <i class="fas fa-search"></i>
        <p>Nenhuma recompensa encontrada nesta categoria.</p>
      </div>
    `;
  }
  
  return rewards.map(reward => `
    <div class="reward-card ${!reward.available || reward.points > userRewards.points ? 'reward-unavailable' : ''}">
      <div class="reward-image">
        <img src="${reward.image}" alt="${reward.name}" onerror="this.src='https://via.placeholder.com/150?text=Recompensa'">
      </div>
      <div class="reward-info">
        <h3 class="reward-name">${reward.name}</h3>
        <p class="reward-description">${reward.description}</p>
        <div class="reward-points">
          <i class="fas fa-star"></i> ${reward.points} pontos
        </div>
        <button class="reward-btn" data-id="${reward.id}" ${!reward.available || reward.points > userRewards.points ? 'disabled' : ''}>
          ${!reward.available ? 'Indisponível' : reward.points > userRewards.points ? 'Pontos insuficientes' : 'Resgatar'}
        </button>
      </div>
    </div>
  `).join('');
}

// Função para adicionar eventos aos botões de resgate
function addRedeemEvents() {
  document.querySelectorAll('.reward-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', function() {
      const rewardId = parseInt(this.dataset.id);
      const reward = availableRewards.find(r => r.id === rewardId);
      
      if (reward && reward.available && reward.points <= userRewards.points) {
        // Simular resgate
        alert(`Parabéns! Você resgatou "${reward.name}" por ${reward.points} pontos.\n\nUm e-mail com instruções para retirada será enviado para você.`);
      }
    });
  });
}

// Função para formatar data
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Adicionar botão de recompensas na topbar
function addRewardsButton() {
  const topbarActions = document.querySelector('.topbar-actions');
  
  // Criar botão de recompensas
  const rewardsBtn = document.createElement('div');
  rewardsBtn.className = 'rewards-btn-topbar';
  rewardsBtn.id = 'rewards-btn';
  rewardsBtn.innerHTML = `
    <i class="fas fa-gift"></i>
    <span class="rewards-points-badge">${userRewards.points}</span>
  `;
  
  // Inserir antes do botão de notificações
  topbarActions.insertBefore(rewardsBtn, document.getElementById('notification-btn'));
  
  // Adicionar evento de clique
  rewardsBtn.addEventListener('click', openRewardsModal);
}

// Inicializar sistema de recompensas quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Adicionar botão de recompensas na topbar
  addRewardsButton();
});
