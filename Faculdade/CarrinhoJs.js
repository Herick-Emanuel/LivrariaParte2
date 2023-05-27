// Recebe os livros adicionados ao carrinho da localStorage
var livrosAdicionados = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];
var ultimoLivroAdicionado = JSON.parse(localStorage.getItem('ultimoLivroAdicionado')) || null;

// Verifica se há livros adicionados
if (livrosAdicionados.length > 0) {
  var divLivrosCarrinho = document.getElementById('livros-carrinho');

  // Cria elementos HTML para cada livro adicionado e adiciona-os à div
  livrosAdicionados.forEach(function(livro) {
    var livroElement = document.createElement('div');
    livroElement.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" width="200">
      <p>Título: ${livro.titulo}</p>
      <p>Preço: ${livro.preco}</p>
      <button class="meu-botao" onclick="removerDoCarrinho('${livro.titulo}')">Remover do Carrinho</button>
    `;
    divLivrosCarrinho.appendChild(livroElement);
  });
}

function adicionarAoCarrinho(imagem, titulo, preco) {
  var livro = {
    imagem: imagem,
    titulo: titulo,
    preco: preco
  };

  var livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];
  livrosCarrinho.push(livro);
  localStorage.setItem('livrosCarrinho', JSON.stringify(livrosCarrinho));

  ultimoLivroAdicionado = livro;
  localStorage.setItem('ultimoLivroAdicionado', JSON.stringify(ultimoLivroAdicionado));

  exibirMensagem('Livro adicionado ao carrinho.');

  // Limpar o campo de pesquisa
  document.getElementById('livro-input').value = '';

  exibirLivrosCarrinho();

  // Exibir o último livro adicionado no perfil
  exibirUltimoLivro();
}

function exibirMensagem(mensagem) {
  var mensagemElement = document.getElementById('mensagem');
  mensagemElement.textContent = mensagem;
  mensagemElement.style.display = 'block';

  setTimeout(function() {
    mensagemElement.textContent = '';
    mensagemElement.style.display = 'none';
  }, 1500);
}

function removerDoCarrinho(titulo) {
  var livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];

  // Encontra o índice do livro no carrinho pelo título
  var index = livrosCarrinho.findIndex(function(livro) {
    return livro.titulo === titulo;
  });

  if (index >= 0) {
    livrosCarrinho.splice(index, 1);
    localStorage.setItem('livrosCarrinho', JSON.stringify(livrosCarrinho));
    exibirLivrosCarrinho();
    exibirMensagem('Livro removido do carrinho.');
  }
}

function exibirLivrosCarrinho() {
  var divLivrosCarrinho = document.getElementById('livros-carrinho');

  // Limpar o conteúdo anterior
  divLivrosCarrinho.innerHTML = '';

  var livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];

  if (livrosCarrinho.length > 0) {
    livrosCarrinho.forEach(function(livro) {
      var livroElement = document.createElement('div');
      var imagemElement = document.createElement('img');
      var tituloElement = document.createElement('p');
      var precoElement = document.createElement('p');
      var btnRemoverElement = document.createElement('button');

      imagemElement.src = livro.imagem;
      imagemElement.alt = livro.titulo;
      imagemElement.width = 200;

      tituloElement.textContent = 'Título: ' + livro.titulo;
      precoElement.textContent = 'Preço: ' + livro.preco;

      btnRemoverElement.textContent = 'Remover do Carrinho';
      btnRemoverElement.className = 'meu-botao';
      btnRemoverElement.onclick = function() {
        removerDoCarrinho(livro.titulo);
      };

      livroElement.appendChild(imagemElement);
      livroElement.appendChild(tituloElement);
      livroElement.appendChild(precoElement);
      livroElement.appendChild(btnRemoverElement);

      divLivrosCarrinho.appendChild(livroElement);
    });
  } else {
    divLivrosCarrinho.innerHTML = '<p>Nenhum livro adicionado ao carrinho.</p>';
  }
  
  var divUltimoLivro = document.getElementById('ultimo-livro');

  if (ultimoLivroAdicionado) {
    divUltimoLivro.innerHTML = `
      <img src="${ultimoLivroAdicionado.imagem}" alt="${ultimoLivroAdicionado.titulo}" width="200">
      <p>Título: ${ultimoLivroAdicionado.titulo}</p>
      <p>Preço: ${ultimoLivroAdicionado.preco}</p>
    `;
  } else {
    divUltimoLivro.innerHTML = '<p>Nenhum livro adicionado ao carrinho.</p>';
  }
}

// Chamar a função inicialmente para exibir os livros do carrinho
exibirLivrosCarrinho();

document.addEventListener('DOMContentLoaded', function() {
  var mensagemElement = document.getElementById('mensagem-carrinho');
  var mensagem = getURLParameter('mensagem');

  if (mensagem) {
    mensagemElement.textContent = mensagem;
  } else {
    mensagemElement.style.display = 'none';
  }
});

// Função para obter um parâmetro da URL por nome
function getURLParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}