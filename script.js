const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const eraserButton = document.getElementById('eraser');
const colorPicker = document.getElementById('colorPicker');
const saveButton = document.getElementById('save');

let isDrawing = false;
let isErasing = false;
let currentColor = '#000000';

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 200;
context.lineWidth = 5;
context.lineJoin = 'round';
context.lineCap = 'round';

function startDrawing(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (!isDrawing) return;
  if (isErasing) {
    context.clearRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 10, 10);
  } else {
    context.strokeStyle = currentColor;
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
  context.closePath();
}

clearButton.addEventListener('click', () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

eraserButton.addEventListener('click', () => {
  isErasing = !isErasing;
  eraserButton.classList.toggle('active', isErasing);
  if (isErasing) {
    context.strokeStyle = '#ffffff'; // Set color to white for erasing
  } else {
    context.strokeStyle = currentColor;
  }
});

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  if (!isErasing) {
    context.strokeStyle = currentColor;
  }
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

saveButton.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'painting.png';
  link.click();
});
