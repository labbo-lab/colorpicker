hex = document.getElementById("hex")
hexTrim = document.getElementById("hexTrim")
colorpicker = document.getElementById("colorpicker")
rgb = document.getElementById("rgb")
SDSave = document.getElementById("SDSave")

colorpicker.addEventListener("input", colorPick)
hex.addEventListener("click", copy)
rgb.addEventListener("click", copy)
hexTrim.addEventListener("click", copy)
saveButton.addEventListener("click", openSaveDial)
SDSave.addEventListener("click", saveColorImage)

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = "#" + 000000;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function colorPick(e) {
  colorpicker.style.background = colorpicker.value
  colorHex = colorpicker.value.slice(1,7)
  r = Number.parseInt(colorHex.slice(0,2), 16)
  g = Number.parseInt(colorHex.slice(2,4), 16)
  b = Number.parseInt(colorHex.slice(4,6), 16)
  rT = (Math.floor(r/10)*10).toString(16).slice(0,1)
  bT = (Math.floor(g/10)*10).toString(16).slice(0,1)
  gT = (Math.floor(b/10)*10).toString(16).slice(0,1)
  rgb.innerText = 
    `rgb(${r}, ${g}, ${b})`
  hex.innerText =
    `#${colorHex}`
  hexTrim.innerText =
    `#${rT}${gT}${bT}`
  ctx.fillStyle = "#" + colorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function copy(e) {
  if (e.target.innerText != "copied") {
    holdText = e.target.innerText    
  }
  navigator.clipboard.writeText(e.target.innerText)
  e.target.innerText = "copied"
  setTimeout(() => {
    e.target.innerText = holdText
  }, 500);
}

document.addEventListener("keydown", handleKeyDown)
document.addEventListener("keyup", handleKeyUp)

function handleKeyDown(e) {
  if (e.shiftKey == true) {
    document.getElementById("width").setAttribute("step", 10)
    document.getElementById("height").setAttribute("step", 10)
  }
}
function handleKeyUp(e) {
  if (e.shiftKey == true) {
    document.getElementById("width").setAttribute("step", 1)
    document.getElementById("height").setAttribute("step", 1)
  }
}

function openSaveDial(e) {
  saveDialog.showModal();
}


function saveColorImage(e) {
  canvas.width = document.getElementById("width").value
  canvas.height = document.getElementById("height").value
  ctx.fillStyle = "#" + colorHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  link = document.createElement('a');
  link.download = 'filename.png';
  link.href = canvas.toDataURL()
  link.click();
}

