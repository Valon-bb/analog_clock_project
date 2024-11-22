function setClock() {
  const now = new Date();
  const h = now.getHours();
  const min = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const hRotate = ((h % 12) / 12) * 360 + (min / 60) * 30 - 90; // Stundenrotation mit Minutenanpassung
  const minRotate = (min / 60) * 360 + (s / 60) * 6 - 90; // Minutenrotation mit Sekundenanpassung
  const sRotate = (s / 60) * 360 + (ms / 1000) * 6 - 90; // Sekundenrotation mit Millisekundenanpassung

  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.min-hand');
  const secondHand = document.querySelector('.second-hand');

  if (hourHand) hourHand.style.transform = `rotate(${hRotate}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minRotate}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${sRotate}deg)`;
}

document.addEventListener("DOMContentLoaded", function() {
  // Create a new div element for the swing
  const swingDiv = document.createElement("div");
  swingDiv.className = "swing";
  swingDiv.style.height = "900px"; // Länge des Pendels
  swingDiv.style.width = "10px"; // Breite des Pendels
  swingDiv.style.backgroundColor = "black";
  swingDiv.style.position = "absolute";
  swingDiv.style.top = "101%";
  swingDiv.style.left = "49%";
  swingDiv.style.transformOrigin = "top center";

  // Create a new div element for the ball
  const ballDiv = document.createElement("div");
  ballDiv.className = "ball";
  ballDiv.style.width = "80px"; // Durchmesser des Balls
  ballDiv.style.height = "80px"; // Durchmesser des Balls
  ballDiv.style.backgroundColor = "black";
  ballDiv.style.borderRadius = "50%";
  ballDiv.style.position = "absolute";
  ballDiv.style.bottom = "0";
  ballDiv.style.left = "50%";
  ballDiv.style.transform = "translateX(-50%)";

  // Append the ball to the swing
  swingDiv.appendChild(ballDiv);

  // Find the clock element
  const clockElement = document.querySelector(".inner-clock-face");

  // Ensure the clock element is positioned
  if (clockElement) {
    clockElement.style.position = "relative";
    clockElement.appendChild(swingDiv);
  }
});



function swing() {
  const now = new Date();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  // Calculate the angle for the pendulum swing using a sine wave
  const swingAngle = Math.sin(((s + ms / 1000) / 2) * Math.PI * 2) * 30; // Swing angle between -30 and 30 degrees

  const swingDiv = document.querySelector('.swing');
  if (swingDiv) {
    swingDiv.style.transform = `rotate(${swingAngle}deg)`;
  }
}

setInterval(setClock, 1000 / 60); // Aktualisiere 60 Mal pro Sekunde für flüssige Bewegung
setClock(); // Initialer Aufruf um die Uhr sofort zu setzen
setInterval(swing, 1000 / 60); // Aktualisiere 60 Mal pro Sekunde für flüssige Bewegung
swing(); // Initialer Aufruf um das Pendel sofort zu setzen
