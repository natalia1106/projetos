document.addEventListener('DOMContentLoaded', function() {
  // Elementos de navegação entre abas
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  // Formulários
  const loginFormElement = document.getElementById('login-form-element');
  const registerFormElement = document.getElementById('register-form-element');
  
  // Campos de CPF
  const loginCpf = document.getElementById('login-cpf');
  const registerCpf = document.getElementById('register-cpf');
  
  // Botões de mostrar/ocultar senha
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  // Alternar entre abas de login e cadastro
  loginTab.addEventListener('click', function() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });
  
  registerTab.addEventListener('click', function() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  });
  
  // Formatação de CPF
  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após os primeiros 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca ponto após os segundos 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca hífen antes dos últimos 2 dígitos
    return cpf;
  }
  
  // Validação de CPF
  function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais (CPF inválido, mas passa na validação matemática)
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cpf.charAt(9)) !== digit1) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cpf.charAt(10)) === digit2;
  }
  
  // Aplicar formatação de CPF nos campos
  [loginCpf, registerCpf].forEach(input => {
    input.addEventListener('input', function() {
      const formattedValue = formatCPF(this.value);
      this.value = formattedValue;
    });
    
    input.addEventListener('blur', function() {
      if (this.value.length > 0) {
        if (!isValidCPF(this.value)) {
          this.classList.add('invalid');
          this.nextElementSibling.textContent = 'CPF inválido';
          this.nextElementSibling.style.color = 'red';
        } else {
          this.classList.remove('invalid');
          this.nextElementSibling.textContent = 'CPF válido';
          this.nextElementSibling.style.color = 'green';
        }
      }
    });
  });
  
  // Mostrar/ocultar senha
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
  
  // Validação de formulário de login
  loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cpf = loginCpf.value;
    const password = document.getElementById('login-password').value;
    
    if (!isValidCPF(cpf)) {
      alert('Por favor, insira um CPF válido.');
      return;
    }
    
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    // Simulação de login bem-sucedido
    // Em um ambiente real, isso seria uma chamada de API
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userCPF', cpf);
    
    // Redirecionar para a página principal
    window.location.href = 'index.html';
  });
  
  // Validação de formulário de cadastro
  registerFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const cpf = registerCpf.value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const acceptTerms = document.getElementById('accept-terms').checked;
    
    if (name.length < 3) {
      alert('Por favor, insira seu nome completo.');
      return;
    }
    
    if (!isValidCPF(cpf)) {
      alert('Por favor, insira um CPF válido.');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    if (password.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    if (!acceptTerms) {
      alert('Você deve aceitar os termos de uso e política de privacidade.');
      return;
    }
    
    // Simulação de cadastro bem-sucedido
    // Em um ambiente real, isso seria uma chamada de API
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userCPF', cpf);
    localStorage.setItem('userName', name);
    
    // Redirecionar para a página principal
    window.location.href = 'index.html';
  });
  
  // Verificar se o usuário já está logado
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
  }
});
