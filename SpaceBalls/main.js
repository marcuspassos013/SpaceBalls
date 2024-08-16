// Seleciona o elemento canvas do HTML
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Função para ajustar o tamanho do canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Configura o tamanho do canvas na inicialização
resizeCanvas();

// Atualiza o tamanho do canvas quando a janela é redimensionada
window.addEventListener("resize", resizeCanvas);

// Define a largura e altura do canvas com base na janela do navegador
const width = canvas.width;
const height = canvas.height;

// Função para gerar um número aleatório entre min e max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar uma cor aleatória em formato RGB
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function randomRGBA(alpha = 1) {
  return `rgba(${random(200, 255)}, ${random(200, 255)}, ${random(
    200,
    255
  )}, ${alpha})`;
}

// Construtor de Partícula
function Particle(x, y, velX, velY, color) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.life = 100; // Vida útil da partícula
}

// Métodos da Partícula
Particle.prototype.update = function () {
  this.x += this.velX;
  this.y += this.velY;
  this.life--;
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
  ctx.fill();
};

// Construtor de bola
function Ball(x, y, velX, velY, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = randomRGB();
  this.size = size;
}

// Métodos da bola
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function () {
  this.checkBounds();
  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.checkBounds = function () {
  if (this.x + this.size >= width || this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height || this.y - this.size <= 0) {
    this.velY = -this.velY;
  }
};

// Construtor de míssil
function Missile(x, y, angle) {
  this.x = x;
  this.y = y;
  this.velX = Math.cos(angle) * 10;
  this.velY = Math.sin(angle) * 10;
  this.size = 5;
  this.color = "white";
}

// Métodos do míssil
Missile.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Missile.prototype.update = function () {
  this.x += this.velX;
  this.y += this.velY;
};

// Construtor de triângulo
function Triangle(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velX = 0;
  this.velY = 0;
  this.angle = 0; // Ângulo de rotação
  this.color = "white";
}

// Métodos do triângulo
Triangle.prototype.draw = function () {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.beginPath();
  ctx.moveTo(0, -this.size);
  ctx.lineTo(-this.size, this.size);
  ctx.lineTo(this.size, this.size);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
};

Triangle.prototype.shoot = function () {
  // Calcula a posição de cada míssil nos dois lados do triângulo
  const missileX1 = this.x + Math.cos(this.angle) * -this.size;
  const missileY1 = this.y + Math.sin(this.angle) * -this.size;
  const missileX2 = this.x + Math.cos(this.angle) * this.size;
  const missileY2 = this.y + Math.sin(this.angle) * this.size;

  // Cria dois mísseis, um de cada lado, ambos na mesma direção
  const missile1 = new Missile(missileX1, missileY1, this.angle - Math.PI / 2);
  const missile2 = new Missile(missileX2, missileY2, this.angle - Math.PI / 2);

  // Adiciona os mísseis ao array de mísseis
  missiles.push(missile1);
  missiles.push(missile2);

  // Reproduz o som de disparo
  shootSound.currentTime = 0; // Reinicia o som se estiver tocando
  shootSound.play();
};

Triangle.prototype.update = function () {
  this.x += this.velX;
  this.y += this.velY;

  // Evita que o triângulo saia dos limites do canvas
  if (this.x - this.size < 0) this.x = this.size;
  if (this.x + this.size > width) this.x = width - this.size;
  if (this.y - this.size < 0) this.y = this.size;
  if (this.y + this.size > height) this.y = height - this.size;
};

// Função para detectar colisão entre dois objetos
function collisionDetect(obj1, obj2) {
  const dx = obj1.x - obj2.x;
  const dy = obj1.y - obj2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < obj1.size + obj2.size;
}

// Cria arrays para armazenar as bolas e os mísseis
let balls = [];
let missiles = [];

// Cria um triângulo
let triangle = new Triangle(width / 2, height - 50, 20);

// Contador de bolas acertadas
let score = 0;

// Contador de vidas
let lives = 3;

// Atualiza o display de vidas
function updateLivesDisplay() {
  document.getElementById("livesDisplay").innerHTML = `Vidas: ${"❤️".repeat(
    lives
  )}`;
}

// Atualiza o display de pontuação
function updateScoreDisplay() {
  document.getElementById(
    "scoreDisplay"
  ).innerText = `Bolas acertadas: ${score}`;
}

// Carrega os sons
const explosionSound = new Audio("explosion.mp3");
const shootSound = new Audio("shoot.mp3");
const collisionSound = new Audio("colidir.mp3");
const gameOverMusic = new Audio("game-over.mp3");

const backgroundMusic = new Audio("background.mp3"); // Música de fundo

// Função para iniciar o jogo
function startGame() {
  // Esconde o modal de boas-vindas
  document.getElementById("welcomeModal").style.display = "none";
  // Mostra o display de vidas
  document.getElementById("livesDisplay").style.display = "block";

  // Reseta as vidas e pontuação
  lives = 3;
  score = 0;
  updateLivesDisplay();
  updateScoreDisplay();

  // Configura a música de fundo
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.8; // Ajusta o volume conforme necessário
  backgroundMusic.play().catch((error) => {
    console.error("Erro ao tocar a música:", error);
  });

  // Inicia o loop do jogo
  loop();
}

// Função para gerar bolas dinamicamente
function generateBalls() {
  if (balls.length < 10) {
    const size = random(10, 20);
    const ball = new Ball(
      random(size, width - size),
      random(size, height / 2),
      random(-2, 2),
      random(-2, 2),
      size
    );
    balls.push(ball);
  }
}

//função colisão entre triângulo e bolas
// Função para gerar e animar partículas na explosão
function triggerExplosion() {
  console.log("explosão acionada");
  // Reproduz o som de explosão
  explosionSound.currentTime = 0; // Reinicia o som se estiver tocando
  explosionSound.play();

  // Adiciona partículas
  console.log("Criando partículas");
  const particles = [];
  const numParticles = 30; // Aumentei o número de partículas para um efeito mais visual
  for (let i = 0; i < numParticles; i++) {
    const angle = random(0, 2 * Math.PI);
    const speed = random(2, 5);
    const velX = Math.cos(angle) * speed;
    const velY = Math.sin(angle) * speed;
    const color = `rgba(${random(200, 255)}, ${random(200, 255)}, ${random(
      200,
      255
    )}, 1)`;
    particles.push(new Particle(triangle.x, triangle.y, velX, velY, color));
  }

  // Função para animar as partículas
  function animateParticles() {
    ctx.save();
    ctx.translate(triangle.x, triangle.y);
    ctx.globalCompositeOperation = "source-over"; // Melhora o efeito visual das partículas

    console.log("Particles count:", particles.length);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    ctx.restore();

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    }
  }

  animateParticles();
}
// Função para atualizar e desenhar tudo
function loop() {
  ctx.fillStyle = "black"; // Escurece o fundo continuamente
  ctx.fillRect(0, 0, width, height);

  generateBalls();

  // Atualiza e desenha as bolas
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].draw();

    // Verifica colisões entre bolas e triângulo
    if (collisionDetect(balls[i], triangle)) {
      lives--;
      updateLivesDisplay();
      collisionSound.currentTime = 0; // Reinicia o som se estiver tocando
      collisionSound.play(); // Reproduz o som de colisão
      balls.splice(i, 1);
      triangle.x = width / 2;
      triangle.y = height - 50;

      // Adiciona efeito de explosão no triângulo
      triggerExplosion();

      if (lives <= 0) {
        // Exibe o modal de fim de jogo
        document.getElementById("finalScore").innerText = score;
        document.getElementById("gameOverModal").style.display = "flex";
        document.getElementById("livesDisplay").style.display = "none";
        backgroundMusic.pause();
        gameOverMusic.play();

        return;
      }
      break;
    }
  }

  // Atualiza e desenha os mísseis
  for (let i = 0; i < missiles.length; i++) {
    missiles[i].update();
    missiles[i].draw();
  }

  // Verifica colisões entre mísseis e bolas
  for (let i = 0; i < missiles.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (collisionDetect(missiles[i], balls[j])) {
        // Reproduz o som de explosão
        explosionSound.currentTime = 0; // Reinicia o som se estiver tocando
        explosionSound.play();

        balls.splice(j, 1); // Remove a bola
        missiles.splice(i, 1); // Remove o míssil
        score++; // Incrementa o contador de acertos
        updateScoreDisplay(); // Atualiza a pontuação
        i--; // Ajusta o índice do míssil para evitar pular o próximo
        break;
      }
    }
  }

  // Atualiza e desenha o triângulo
  triangle.update();
  triangle.draw();

  // Exibe o contador de acertos
  // ctx.fillStyle = "white";
  // ctx.font = "20px Arial";
  // ctx.fillText(`Bolas acertadas: ${score}`, 10, 30);

  requestAnimationFrame(loop);
}

// Controles do teclado
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      triangle.velX = -5;
      break;
    case "ArrowRight":
      triangle.velX = 5;
      break;
    case "ArrowUp":
      triangle.velY = -5;
      break;
    case "ArrowDown":
      triangle.velY = 5;
      break;
    case "a": // Rotaciona para a esquerda
      triangle.angle -= 0.1;
      break;
    case "d": // Rotaciona para a direita
      triangle.angle += 0.1;
      break;
    case " ": // Atira mísseis ao pressionar a barra de espaço
      triangle.shoot();
      break;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    triangle.velX = 0;
  }
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    triangle.velY = 0;
  }
});

// Adiciona o ouvinte de clique para o botão de reinício
document.getElementById("restartGame").addEventListener("click", function () {
  document.getElementById("gameOverModal").style.display = "none";
  startGame();
});

// Adiciona o ouvinte de clique para o botão de início
document.getElementById("startGame").addEventListener("click", startGame);

// Exibe o modal de boas-vindas ao carregar o jogo
window.addEventListener("load", function () {
  document.getElementById("welcomeModal").style.display = "flex";
});
