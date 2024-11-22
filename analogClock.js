function setClock() {
  const now = new Date(); // Get the current date and time
  const h = now.getHours(); // Extract the current hour
  const min = now.getMinutes(); // Extract the current minutes
  const s = now.getSeconds(); // Extract the current seconds
  const ms = now.getMilliseconds(); // Extract the current milliseconds

  // Calculate the rotation for the hour hand, adjusting for minutes
  const hRotate = ((h % 12) / 12) * 360 + (min / 60) * 30 - 90;
  // Calculate the rotation for the minute hand, adjusting for seconds
  const minRotate = (min / 60) * 360 + (s / 60) * 6 - 90;
  // Calculate the rotation for the second hand, adjusting for milliseconds
  const sRotate = (s / 60) * 360 + (ms / 1000) * 6 - 90;

  // Select the elements representing the clock hands
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.min-hand');
  const secondHand = document.querySelector('.second-hand');

  // Apply the calculated rotation to each hand if the element exists
  if (hourHand) hourHand.style.transform = `rotate(${hRotate}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minRotate}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${sRotate}deg)`;
}

document.addEventListener("DOMContentLoaded", function() {
  // Create a new div element for the pendulum
  const swingDiv = document.createElement("div");
  swingDiv.className = "swing";
  swingDiv.style.height = "900px"; // Length of the pendulum
  swingDiv.style.width = "10px"; // Width of the pendulum
  swingDiv.style.backgroundColor = "black"; // Color of the pendulum
  swingDiv.style.position = "absolute"; // Absolute positioning
  swingDiv.style.top = "101%"; // Position slightly below the clock
  swingDiv.style.left = "49%"; // Center horizontally
  swingDiv.style.transformOrigin = "top center"; // Set rotation point at top

  // Create a new div element for the ball at the end of the pendulum
  const ballDiv = document.createElement("div");
  ballDiv.className = "ball";
  ballDiv.style.width = "80px"; // Diameter of the ball
  ballDiv.style.height = "80px"; // Diameter of the ball
  ballDiv.style.backgroundColor = "black"; // Color of the ball
  ballDiv.style.borderRadius = "50%"; // Make the ball round
  ballDiv.style.position = "absolute"; // Absolute positioning
  ballDiv.style.bottom = "0"; // Position at the bottom of the pendulum
  ballDiv.style.left = "50%"; // Center horizontally
  ballDiv.style.transform = "translateX(-50%)"; // Correct centering

  // Append the ball to the pendulum
  swingDiv.appendChild(ballDiv);

  // Find the clock element within the HTML
  const clockElement = document.querySelector(".inner-clock-face");

  // Ensure the clock element is positioned and append the pendulum
  if (clockElement) {
    clockElement.style.position = "relative";
    clockElement.appendChild(swingDiv);
  }
});

function swing() {
  const now = new Date(); // Get the current date and time
  const s = now.getSeconds(); // Extract the current seconds
  const ms = now.getMilliseconds(); // Extract the current milliseconds

  // Calculate the angle for the pendulum swing using a sine wave function
  const swingAngle = Math.sin(((s + ms / 1000) / 2) * Math.PI * 2) * 30; // Swing angle between -30 and 30 degrees

  // Select the pendulum element and apply the calculated rotation
  const swingDiv = document.querySelector('.swing');
  if (swingDiv) {
    swingDiv.style.transform = `rotate(${swingAngle}deg)`;
  }
}

// Update the clock hands 60 times per second for smooth movement
setInterval(setClock, 1000 / 60);
setClock(); // Initial call to set the clock immediately

// Update the pendulum swing 60 times per second for smooth movement
setInterval(swing, 1000 / 60);
swing(); // Initial call to set the pendulum immediately
