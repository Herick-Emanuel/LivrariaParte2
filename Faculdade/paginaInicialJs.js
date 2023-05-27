document.addEventListener('DOMContentLoaded', function() {
  var divLivrosCarrinho = document.getElementById('livros-carrinho');
  divLivrosCarrinho.innerHTML = '';

  // Exibir apenas os livros no carrinho
  var livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];

  if (livrosCarrinho.length > 0) {
    livrosCarrinho.forEach(function(livro) {
      var livroElement = document.createElement('div');

      var imagemElement = document.createElement('img');
      imagemElement.src = livro.imagem;
      imagemElement.alt = livro.titulo;
      imagemElement.width = 200;

      var tituloElement = document.createElement('p');
      tituloElement.textContent = 'Título: ' + livro.titulo;

      var precoElement = document.createElement('p');
      precoElement.textContent = 'Preço: ' + livro.preco;

      livroElement.appendChild(imagemElement);
      livroElement.appendChild(tituloElement);
      livroElement.appendChild(precoElement);

      divLivrosCarrinho.appendChild(livroElement);
    });
  } else {
    divLivrosCarrinho.innerHTML = '<p>Nenhum livro adicionado ao carrinho.</p>';
  }

  var btnPesquisar = document.getElementById('btn-pesquisar');
  btnPesquisar.addEventListener('click', function() {
    var livroPesquisado = document.getElementById('livro-input').value;

    if (livroPesquisado.trim() !== '') {
      window.location.href = 'Descricao.html?livro=' + encodeURIComponent(livroPesquisado);
    }
  });

  // Chame a função atualizarExibicaoCarrinho() para exibir os livros no carrinho
  atualizarExibicaoCarrinho();
});