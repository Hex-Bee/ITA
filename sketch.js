// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
let myCharacteristicRead;
let myCharacteristicWrite;
let myValue = 0;
let myValueSaved = 0;
let myBLE;

let connectButton;

let TiempoBotton = 0;

let pulsadorPresionado = false;

let pulsadorPresionadoTime = 1000;

let TimeOutConnexion = 2000;

let Try1 = true;

let Timer1 = 0;

let EmptyTime = true;

let pulsador = 0;

let Command1 = {
  message: "aes",
  value:
    "yBqp8n512VpgRgI5ZKr0VwXZPNrn+0o5ujdhgAB6mOpWV8W2JuuAhp82sEls+g4tlrUvwc6ve8dAtusdSQ1GwYkDd1LjuWsSxQ7IjDDlsCqsGmtu9NwlVlJr+sSAmtZh",
};

let Command2 = {
  message: "aes",
  value: "ADnttYcEblC/WGwtItaJM5j6ilzVkauKW6xgSLw48eChHol/2K0nNEDKXrjyvP49PI2VyruZqogMo8x7ah4sULk+416oAl9XAXjcF+qETlg=",
};



function setup() {
  
  myBLE = new p5ble();

  createCanvas(window.innerWidth, window.innerHeight);

  connectButton = createButton("Toca la pantalla para empezar a buscar");

  connectButton.size(width, height);
  connectButton.position(
    width / 2 - connectButton.width / 2,
    height / 2 - connectButton.height / 2
  );
  connectButton.style("background-color", color(65));
  connectButton.style("font-size", "27px");
  connectButton.mousePressed(connectToBle);
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
  connectButton.remove();
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log("characteristics: ", characteristics);
  myCharacteristicWrite = characteristics[0];
  myCharacteristicRead = characteristics[1];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristicRead, gotValue);
}

// A function that will be called once got values
function gotValue(error, value) {
  if (error) console.log("error: ", error);
  console.log("value: ", value);
  myValue = value;
  
  if (myBLE.isConnected()) {

  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristicRead, gotValue);
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
  // myBLE.read(myCharacteristic, 'string', gotValue);
    
  }
}

function draw() {
  
  if (myValue >= 1 && myValue <= 4) {
    
  myValueSaved = myValue;
      
      }

  if (fullscreen() == undefined) {
    background(65);
  } else {
    background(121, 224, 212);

    textAlign(CENTER, CENTER);

    textSize(20);

    fill(255);

    strokeWeight(3);

    stroke(0);

    text("ITAINNOVA", width / 2, height * 0.03);

    rectMode(CORNER, CORNER);

    fill(0, 130);

    strokeWeight(1);

    stroke(0);

    rect(
      width * 0.1,
      height * 0.08,
      width * 0.8,
      height * 0.1,
      displayDensity() * 5
    );

    textAlign(CENTER, CENTER);

    textSize(26);

    fill(255);

    strokeWeight(2);

    stroke(0);

    text("Conectado a: ESP32 ANF", width / 2, height * 0.135);

    if (
      mouseX >= width * 0.1 &&
      mouseY >= height * 0.24 &&
      mouseX <= width * 0.1 + width * 0.4 &&
      mouseY <= height * 0.24 + height * 0.07 &&
      mouseIsPressed == true
    ) {
      
        if (myBLE.isConnected() && EmptyTime == false) {
  
          
          let comandoSend = JSON.stringify(Command1);

          for(let veces = 0; veces < 300; veces++) {
            
      myBLE.write(myCharacteristicWrite, comandoSend);
         
            
          }
          
          EmptyTime = true;
          
        }
      
            fill(207, 138, 83);
      
    } else {

        fill(255, 168, 97);
      
    }

    rect(
      width * 0.1,
      height * 0.24,
      width * 0.4,
      height * 0.07,
      displayDensity() * 5
    );

    textSize(23);

    fill(255, 0, 0);

    strokeWeight(3);

    stroke(0);

    text("RESET", width * 0.1 + width * 0.2, height * 0.24 + height * 0.035);

    strokeWeight(2);

    stroke(255, 0, 0);

    text("RESET", width * 0.1 + width * 0.2, height * 0.24 + height * 0.035);

    if (
      mouseX >= width * 0.1 &&
      mouseY >= height * 0.34 &&
      mouseX <= width * 0.1 + width * 0.8 &&
      mouseY <= height * 0.34 + height * 0.2 &&
      mouseIsPressed == true
    ) {
      
        if (myBLE.isConnected() && EmptyTime == false) {
          
                    let comandoSend = JSON.stringify(Command2);
          
      for(let veces = 0; veces < 300; veces++) {
          
      myBLE.write(myCharacteristicWrite, comandoSend);
          
        }
          
          EmptyTime = true;
          
        }
      
              fill(138, 179, 112);
      
    } else {


        fill(197, 255, 161);
      
    }

    strokeWeight(2);

    stroke(0);

    rect(
      width * 0.1,
      height * 0.34,
      width * 0.8,
      height * 0.2,
      displayDensity() * 5
    );

    textSize(40);

    fill(255);

    strokeWeight(5);

    stroke(0);

    text("START", width * 0.1 + width * 0.4, height * 0.34 + height * 0.1);

    strokeWeight(3);

    stroke(255);

    text("START", width * 0.1 + width * 0.4, height * 0.34 + height * 0.1);

    textAlign(LEFT, BASELINE);

    textSize(20);

    fill(255);

    strokeWeight(3);

    stroke(0);

    text("Status:", width * 0.12, height * 0.604);

    strokeWeight(1);

    stroke(255);

    text("Status:", width * 0.12, height * 0.604);

    fill(255);

    strokeWeight(3);

    stroke(0);

    rect(
      width * 0.1,
      height * 0.62,
      width * 0.8,
      height * 0.11,
      displayDensity() * 5
    );

    fill(255);

    strokeWeight(3);

    stroke(0);

    text("Log Recived:", width * 0.12, height * 0.78);

    strokeWeight(1);

    stroke(255);

    text("Log Recived:", width * 0.12, height * 0.78);

    fill(255);

    strokeWeight(3);

    stroke(0);

    rect(
      width * 0.1,
      height * 0.8,
      width * 0.8,
      height * 0.14,
      displayDensity() * 5
    );

    textAlign(CENTER, CENTER);

    textSize(36);

    fill(94, 188, 255);

    strokeWeight(2);

    stroke(0);

    if (myValueSaved == 1) {
      text("READY", width / 2, height * 0.62 + (height * 0.11) / 2);
      
          Timer1 = millis();
    
    } else if (myValueSaved == 2) {
      text("START", width / 2, height * 0.62 + (height * 0.11) / 2);
      
          Timer1 = millis();
    
    } else if (myValueSaved == 3) {
      text("RUN", width / 2, height * 0.62 + (height * 0.11) / 2);
      
          Timer1 = millis();
    
    } else if (myValueSaved == 4) {
      text("STOP", width / 2, height * 0.62 + (height * 0.11) / 2);
      
          Timer1 = millis();
    
    }
  }
  
  if (Try1 == false && myBLE.isConnected() == false) {
  
  Try1 = true;
    
  connectButton = createButton("Toca la pantalla para empezar a buscar");

  connectButton.size(width, height);
  connectButton.position(
    width / 2 - connectButton.width / 2,
    height / 2 - connectButton.height / 2
  );
  connectButton.style("background-color", color(65));
  connectButton.style("font-size", "27px");
  connectButton.mousePressed(connectToBle);
    
    }
  
  if (myBLE.isConnected() == true) {
    
    Try1 = false;
    
  }

  textSize(26);

  fill(0);

  strokeWeight(1);

  stroke(0);

  text(myValueSaved, width * 0.1, height * 0.8, width * 0.8, height * 0.14);

}

function mouseReleased() {
    
    EmptyTime = false;
  
}

function mousePressed() {
  fullscreen(true);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
