let img;
let template = sessionStorage.getItem("templ");
template = JSON.parse(template);
function preload() {
  img = loadImage(template.src);
}

function setup() {
  createCanvas(img.width, img.height);
  background(img);
  data = sessionStorage.getItem("obj");
  data = JSON.parse(data);
  d=sessionStorage.getItem("hash");
  if (template.Doctype == "License") {
    fill(0,0,0);
    textSize(22);
    text(data.name, template.temp.Name.x, template.temp.Name.y);
    text(data.DOB, template.temp.DOB.x, template.temp.DOB.y);
    text(data.Address, template.temp.Address.x, template.temp.Address.y);
    text(data.Expiry, template.temp.Expiry.x, template.temp.Expiry.y);
    text(d,855,550)
  } else if (template.Doctype == "Aadhar") {
    fill(0,0,0);
    textSize(22);
    text(data.name, template.temp.Name.x, template.temp.Name.y);
    text(data.DOB, template.temp.DOB.x, template.temp.DOB.y);
    text(data.Address, template.temp.Address.x, template.temp.Address.y);
    textSize(18);
    text(d,70,390)
  } else if (template.Doctype == "Birth") {
    fill(114,114,114);
    textSize(22);
    text(data.name, template.temp.Name.x, template.temp.Name.y);
    text(data.DOB, template.temp.DOB.x, template.temp.DOB.y);
    text(data.FathersName, template.temp.MName.x, template.temp.MName.y);
    text(data.MothersName, template.temp.FName.x, template.temp.FName.y);
  }
  
}

function save() {
  saveCanvas(template.Doctype, 'jpg');
}
