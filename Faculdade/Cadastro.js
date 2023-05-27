document.getElementById('cadastro-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  // Cria um objeto com os dados do usuário
  var usuario = {
    nome: nome,
    email: email,
    senha: senha
  };

  // Armazena os dados do usuário no localStorage
  localStorage.setItem('usuario', JSON.stringify(usuario));

  alert('Cadastro realizado com sucesso!');
  this.reset(); // Limpa os campos do formulário
});