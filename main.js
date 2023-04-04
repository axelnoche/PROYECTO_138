
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
  console.log("¡Modelo cargado!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {

  // la imagen estaba mas grande que el canvas
  image(video, 0, 0, 380, 380);

  if(status != "")
  {
    r = random(255)
    g = random(255)
    b = random(255)
    //  detect estaba mal escrito solo te falto una t "detec"
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Estado: objeto detectado";
        //la matriz es objects
        document.getElementById("number_of_objects").innerHTML = "Número de Objetos Detectado"+objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
           //la matriz es objects
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        //en el ancho pusiste un 1 en luigasr de i
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

