document.addEventListener('DOMContentLoaded', function () {
    // Obtém as informações do usuário do armazenamento local
    var usuario = JSON.parse(localStorage.getItem('usuario'));
  
    // Verifica se o usuário está autenticado
    if (usuario) {
      // Exibe as informações do perfil
      document.getElementById('nome').textContent = usuario.nome;
      document.getElementById('email').textContent = usuario.email;
    } else {
      // Caso o usuário não esteja autenticado, redireciona para a página de login
      window.location.href = 'login.html';
    }
  
    // Chamar a função inicialmente para exibir o último livro adicionado ao carrinho
    exibirUltimoLivro();
  });
  
  var textareaBiografia = document.getElementById('biografia');
  var botaoSalvarBiografia = document.getElementById('salvar-biografia');
  var biografiaContainer = document.getElementById('biografia-container');
  
  // Verifica se a biografia já está salva no armazenamento local
  var biografiaSalva = localStorage.getItem('biografia');
  
  // Se houver uma biografia salva, exibe-a no contêiner
  if (biografiaSalva) {
    biografiaContainer.textContent = biografiaSalva;
  }
  
  botaoSalvarBiografia.addEventListener('click', function () {
    var biografia = textareaBiografia.value;
  
    localStorage.setItem('biografia', biografia);
  
    biografiaContainer.textContent = biografia;
  
    textareaBiografia.value = '';
  });
  
  function exibirUltimoLivro() {
    var carrinho = JSON.parse(localStorage.getItem('livrosCarrinho'));
    if (carrinho && carrinho.length > 0) {
      var ultimoLivro = carrinho[carrinho.length - 1];
      var ultimoLivroElemento = document.getElementById('ultimo-livro');
      ultimoLivroElemento.innerHTML = `
        <div class="item">
          <img src="${ultimoLivro.imagem}" alt="Imagem não encontrada" width="100" title="${ultimoLivro.titulo}" class="imagens">
          <div class="conteudo">
            <p class="titulo-livro">${ultimoLivro.titulo}<br>Preço: ${ultimoLivro.preco}</p>
          </div>
        </div>
      `;
    }
  }