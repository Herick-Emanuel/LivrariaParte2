document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio do formulário

  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  // Obtém as informações do cadastro do armazenamento local
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verifica as credenciais do usuário
  if (usuario && email === usuario.email && senha === usuario.senha) {
    alert('Login bem-sucedido!');
    // Redirecionar para a página principal, por exemplo:
    window.location.href = 'paginaInicial.html';
  } else {
    alert('E-mail ou senha inválidos!');
  }
});