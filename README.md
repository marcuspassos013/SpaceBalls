Space Balls - HTML5 Canvas Game
===============================

🎮 Space Balls
--------------

**Space Balls** é um jogo de arcade desenvolvido com **HTML5**, **CSS3**, e **JavaScript**, utilizando a API de **Canvas**. O objetivo do jogador é controlar um triângulo e desviar de esferas em movimento, sobrevivendo o máximo possível para alcançar a maior pontuação.

🚀 Tecnologias Utilizadas
-------------------------

*   **HTML5**: Estrutura da interface e elementos do jogo.
    
*   **CSS3**: Estilização e efeitos visuais.
    
*   **JavaScript**: Lógica do jogo, movimentação, detecção de colisão e controle da pontuação.
    
*   **Canvas API**: Renderização dos gráficos e animações do jogo.
    
*   **Audio API**: Gerenciamento da trilha sonora, efeitos sonoros e sons de interação.
    

📂 Estrutura do Projeto
-----------------------
SpaceBalls/  │  ├── index.html           # Estrutura do layout e elementos básicos.  ├── style.css            # Estilização e design responsivo.  ├── script.js            # Lógica do jogo, controle de animações e interações.  ├── assets/              # Imagens, sons e outros recursos.  │   ├── images/  │   ├── sounds/  └── README.md            # Documentação do projeto.   `

🔧 Funcionalidades
------------------

*   **Movimentação do Jogador**: Controle do triângulo via teclado (setas ou WASD).
    
*   **Sistema de Pontuação**: A pontuação aumenta de acordo com o tempo de sobrevivência.
    
*   **Detecção de Colisões**: Sistema de colisão preciso entre o triângulo e as esferas.
    
*   **Sons e Música de Fundo**: Efeitos sonoros para colisões, disparos, perda de vidas e uma música imersiva durante o jogo.
    
*   **Modal de Game Over**: Exibição da pontuação final com opção de reiniciar o jogo.
    

📈 Desenvolvimento do Jogo
--------------------------

1.  **Planejamento**: O jogo foi planejado com foco em criar uma experiência simples, mas desafiadora. A mecânica central envolve esquivar de esferas, com um aumento gradual na dificuldade à medida que o tempo passa.
    
2.  **Estruturação**: A estrutura HTML foi definida com a inclusão do elemento canvas para renderizar os gráficos. O CSS foi utilizado para estilizar a interface, incluindo o modal de game over e os botões de controle.
    
3.  **Lógica de Jogo**: O coração do jogo está no arquivo script.js, onde implementei:
    
    *   **Loop Principal**: Controla a atualização da tela, movimentação e lógica do jogo.
        
    *   **Movimentação e Física**: Usei cálculos básicos para simular a física do movimento das esferas e a inércia do triângulo.
        
    *   **Detecção de Colisão**: Funções para detectar colisões precisas, com base na geometria dos elementos.
        
4.  **Animações e Interações**: Desenvolvi animações suaves para o movimento das esferas e o deslocamento do jogador. Além disso, adicionei partículas e efeitos visuais para colisões, melhorando o feedback visual.
    
5.  **Sons e Música**: Implementei sons para colisões, disparos e música de fundo, utilizando a API de áudio do JavaScript. O som muda dinamicamente de acordo com o estado do jogo (por exemplo, música de game over).
    
6.  **Refatoração e Otimização**: Refatorei o código para torná-lo modular e fácil de manter, separando a lógica em funções específicas. Além disso, apliquei técnicas de otimização para garantir o bom desempenho do jogo em diferentes dispositivos.
    
7.  **Interface e Modais**: Criei uma interface intuitiva com um modal de boas-vindas e um modal de game over, com opções claras para o jogador reiniciar o jogo ou visualizar a pontuação final.
    

🎯 Como Jogar
-------------

1.  Abra o arquivo index.html em qualquer navegador moderno.
    
2.  Use as setas ou as teclas de seta para mover o triângulo e desviar das esferas.
    
3.  Tente sobreviver o máximo de tempo possível e alcançar a maior pontuação.
    
4.  Ao perder todas as vidas, o modal de game over será exibido com sua pontuação final e a opção de reiniciar o jogo.
    

🔨 Como Executar o Projeto
--------------------------

Abra o arquivo index.html no seu navegador.

📜 Licença
----------

Este projeto está licenciado sob a MIT License.
