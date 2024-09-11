const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
// Calculate the number of columns based on the canvas width and font size
const columns = canvas.width / fontSize;
// Create an array to store the vertical position of each rain drop
const rainDrops = []; 
// Array para armazenar o caractere do rastro de cada coluna
const charsInColumns = [];

// Inicializa os arrays rainDrops e charsInColumns
for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
  charsInColumns[x] = ''; // Inicializa com string vazia
}

// Define the draw function to render the matrix rain effect
const draw = () => {
  // Clear the canvas with a semi-transparent black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;

  // Loop through each column
  for (let i = 0; i < rainDrops.length; i++) {
    // Sorteia um novo caractere aleatório para o caractere que está caindo
    const currentChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    // Desenha o caractere branco que está caindo (aleatório a cada iteração)
    ctx.fillStyle = '#FFF';
    ctx.fillText(currentChar, i * fontSize, rainDrops[i] * fontSize);

    // Desenha o rastro verde com o caractere armazenado da coluna
    if (rainDrops[i] > 1) {
      ctx.fillStyle = '#0F0';
      ctx.fillText(charsInColumns[i], i * fontSize, (rainDrops[i] - 1) * fontSize);
    }

    // Armazena o caractere atual no array para o rastro na próxima iteração
    charsInColumns[i] = currentChar;

    // Reseta a posição da coluna se o caractere chegou ao fim da tela
    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }

    // Incrementa a posição vertical do caractere caindo
    rainDrops[i]++;
  }
};

// Chama a função draw repetidamente em um intervalo de 90 milissegundos
// Mude o número para cair mais rápido ou devagar.
setInterval(draw, 90);
