const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 420;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 초기 캔버스 색상지정
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; // false 일때 paint 모드상태인거임

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleClickColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleClickRange(event) {
  const range_value = event.target.value;
  ctx.lineWidth = range_value;
}

function handleClickFill(event) {
  if (filling) {
    filling = false;
    fill.innerText = "fill";
  } else {
    filling = true;
    fill.innerText = "paint";
  }
}

function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function imageSave(event) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");

  link.download = "PaintJS🤬";
  link.href = image;
  link.click();
}

if (canvas) {
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM); // 오른쪽 마우스 없애기위함
}

// Array.from(colors).map((color) => color.addEventListener("click", colorSelect));
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleClickColor)
);
if (range) {
  range.addEventListener("input", handleClickRange);
}
if (fill) {
  fill.addEventListener("click", handleClickFill);
}

if (save) {
  save.addEventListener("click", imageSave);
}
