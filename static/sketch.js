function preload() {
  img = loadImage("http://localhost:8080/assets/template");
}

function setup() {
  createCanvas(250, 575);
}

// function runscr() {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var obj = JSON.parse(this.responseText);
//       background(img);
//       fill(114, 114, 114);
//       textSize(10);
//       text(obj.name, 110, 466);
//       text(obj.DOB, 111, 479);
//       text(obj.Address, 120, 492);
//       console.log(obj);
//     }
//   };
//   xmlhttp.open("GET", "License?lichash=" + $("#lichash").val(), true);
//   xmlhttp.send();
// }

function save(){
 saveCanvas(x, 'assets/myCanvas', 'jpg');
}
// textSize(11);
// text('word', 10, 30);
// fill(0, 102, 153);

//
//function setup() {
//let c = createCanvas(100, 100);
//background(255, 0, 0);
//saveCanvas(c, 'myCanvas', 'jpg');
//}