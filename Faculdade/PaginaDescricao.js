document.addEventListener('DOMContentLoaded', function () {
  var btnPesquisar = document.getElementById('btn-pesquisar');

  btnPesquisar.addEventListener('click', function () {
    var livroPesquisado = document.getElementById('livro-input').value;

    if (livroPesquisado.trim() !== '') {
      window.location.href = 'Descricao.html?livro=' + encodeURIComponent(livroPesquisado);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var urlParams = new URLSearchParams(window.location.search);
  var livroPesquisado = urlParams.get('livro');

  if (livroPesquisado) {
    var livroDetalhes = document.getElementById('livro-detalhes');
    var livroInfo = obterLivroInfo(livroPesquisado);

    if (livroInfo) {
      var tituloElement = document.createElement('h2');
      tituloElement.textContent = livroInfo.titulo;

      var imagemElement = document.createElement('img');
      imagemElement.src = livroInfo.imagem;
      imagemElement.alt = livroInfo.titulo;
      imagemElement.classList.add('livro-imagem');

      var precoElement = document.createElement('p');
      precoElement.textContent = 'Preço: ' + livroInfo.preco;

      var descricaoElement = document.createElement('p');
      descricaoElement.textContent = livroInfo.descricao;

      var btnCarrinho = document.createElement('button');
      btnCarrinho.textContent = 'Adicionar ao Carrinho';
      btnCarrinho.classList.add('meu-botao');

      btnCarrinho.addEventListener('click', function() {
        adicionarAoCarrinho(livroInfo);
      });

      livroDetalhes.appendChild(tituloElement);
      livroDetalhes.appendChild(imagemElement);
      livroDetalhes.appendChild(precoElement);
      livroDetalhes.appendChild(descricaoElement);
      livroDetalhes.appendChild(btnCarrinho);
    } else {
      // Livro não encontrado
      livroDetalhes.textContent = 'Livro não encontrado.';
    }
  } 
});

function obterLivroInfo(livro) {
  var livros = {
    "Senhor dos anéis": {
      titulo: 'Senhor dos Anéis',
      imagem: 'Windons/Imagens/Livro1.png',
      preco: 'R$ 29,99',
      descricao: 'O Senhor dos Anéis (The Lord of the Rings, no original) é um livro de alta fantasia, escrito pelo escritor britânico J. R. R. Tolkien. Escrita entre 1937 e 1949, com muitas partes criadas durante a Segunda Guerra Mundial'
    },
    "Harry Potter": {
      titulo: 'Harry Potter',
      imagem: 'Windons/Imagens/Livro2.png',
      preco: 'R$ 29,99',
      descricao: 'Inicialmente, os garotos acreditavam que a Pedra Filosofal, que se encontrava protegida em Hogwarts, fosse alvo de Severo Snape, professor da escola, para que este se tornasse rico. Mas os garotos descobrem que Voldemort, enfraquecido, está à procura da Pedra para se tornar um grande bruxo novamente.'
    },
    "Penumbra": {
      titulo: 'Penumbra',
      imagem: 'Windons/Imagens/Livro3.png',
      preco: 'R$ 29,99',
      descricao: 'Lana é uma garotinha que morreu e agora se encontra perdida na Penumbra. A Penumbra é o local onde as almas de crianças que tiveram uma morte traumática repousam para poder esquecer todo horror da vida passada.'
    },
    "O Poder do Hábito": {
      titulo: 'O Poder do Hábito',
      imagem: 'Windons/Imagens/Livro4.png',
      preco: 'R$ 31,50',
      descricao: 'O objetivo do estudo é explicar por que fazemos o que fazemos. Ou seja, é uma reflexão que aborda como essa capacidade de fazermos coisas de forma subconsciente, com um menor esforço cerebral tende a criar padrões em nossas vidas.'
    },
    "O Homem de Giz": {
      titulo: 'O Homem de Giz',
      imagem: 'Windons/Imagens/Livro5.png',
      preco: 'R$ 49,99',
      descricao: 'O Homem de Giz faz o leitor duvidar de todos os personagens, perder o fôlego nas várias reviravoltas e passar a noite acordado com os trechos macabros. Longe de ser maniqueísta, a história traz personagens complexos que enfrentam traumas e conflitos pessoais.'
    },
    "É assim que acaba": {
      titulo: 'É assim que acaba',
      imagem: 'Windons/Imagens/Livro6.png',
      preco: 'R$ 49,99',
      descricao: 'O livro aborda sem medo alguns tabus da sociedade para explorar a complexidade das relações tóxicas, e como o amor e o abuso muitas vezes coexistem em uma confusão de sentimentos'
    },
    "O Hobbit": {
      titulo: 'O Hobbit',
      imagem: 'Windons/Imagens/Livro7.png',
      preco: 'R$ 49,99',
      descricao: 'Essa edição, em brochura, procura se manter fiel ao público-alvo da jornada de Bilbo: as crianças. Para isso, o livro contém, na íntegra, a mesma tradução da narrativa que compõe a versão em capa dura, além das ilustrações originais de Tolkien.'
    },
    "Luzes do Norte": {
      titulo: 'Luzes do norte',
      imagem: 'Windons/Imagens/Livro8.png',
      preco: 'R$ 49,99',
      descricao: 'Uma aventura intensa e cheia de reviravoltas, com uma protagonista que se recusa a jogar pelas regras dos outros. Entre ursos assustadores, florestas nevadas, mistérios e intrigas'
    },
    "1984": {
      titulo: '1984',
      imagem: 'Windons/Imagens/Livro9.png',
      preco: 'R$ 49,99',
      descricao: 'Trata-se de uma distopia que se passa em Londres, no ano de 1984, retratando um regime totalitário no qual a população é vigiada constantemente.'
    },
    "O Livro da matemática": {
      titulo: 'O Livro da matemática',
      imagem: 'Windons/Imagens/Livro10.png',
      preco: 'R$ 49,99',
      descricao: 'O livro da matemática está repleto de explicações concisas, sem jargões, que descomplicam teorias complexas e citações que facilitam a visualização e memorização dos conceitos, além de ilustrações que complementam e brincam com nossa compreensão dos números.'
    },
  };

  return livros[livro] || null;
}

function adicionarAoCarrinho(livroInfo) {
  var imagem = livroInfo.imagem;
  var titulo = livroInfo.titulo;
  var preco = livroInfo.preco;

  var livro = {
    imagem: imagem,
    titulo: titulo,
    preco: preco
  };

  var livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho')) || [];
  livrosCarrinho.push(livro);
  localStorage.setItem('livrosCarrinho', JSON.stringify(livrosCarrinho));

  exibirMensagem('Livro adicionado ao carrinho.');
  
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