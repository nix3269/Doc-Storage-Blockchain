let img;
let code;
let qr = sessionStorage.getItem("id");
function preload() {
  img = loadImage('/assets/card.png');
  code = loadImage("https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://acute-sustaining-ease.glitch.me/cardlogin?id="+qr)
}

function setup() {
  createCanvas(img.width, img.height);
  background(img);
    name = sessionStorage.getItem("Name")
    fill(0,0,0);
    textSize(22);
    text(name, 217, 147);
    image(code,430,160,180,180)
}

function save() {
  saveCanvas("Card", 'jpg');
}
