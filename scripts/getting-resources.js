import {
  RESOURCE_KEY,
  saveDataToLocalStorage,
} from "./modules/localStorage.js";
import { RESOURCES } from "./modules/resources.js";

/**
 * will add a random amount to the resourceType resource
 * @param {string} resourceType - gold, metal or wood
 */
function addResource(resourceType) {
  const validResourceTypes = ["gold", "metal", "wood"];
  if (!validResourceTypes.includes(resourceType)) return;

  RESOURCES[resourceType] += Math.floor(Math.random() * 101);
  saveDataToLocalStorage(RESOURCE_KEY, RESOURCES);
}

/**
 * JS Canvas and Game logic below
 */

// Select canvas dimensions
const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext("2d");

// Set canvas to fill the parent
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let images = [];
const objectWidth = 50; // Width of the falling image
const objectHeight = 80; // Height of the falling image (non-square)
const fallingSpeed = 2; // Speed of falling images
const cursorRectWidth = 100; // Width of the rectangle for catching
const cursorRectHeight = 20; // Height of the rectangle for catching
let cursorX = canvas.width / 2 - cursorRectWidth / 2; // Starting position of the cursor

// ImageObject constructor
class ImageObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = objectWidth;
    this.height = objectHeight;
    this.image = new Image();
    this.image.src = "./images/starbucks.png"; // Set the image source
  }

  update() {
    this.y += fallingSpeed; // Move the image down
  }

  draw() {
    // Draw the image (non-square)
    ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}

// Create a falling image
function createImage() {
  const x = Math.random() * (canvas.width - objectWidth) + objectWidth / 2; // Random x position, ensure no clipping
  const newImage = new ImageObject(x, 0); // Start at the top
  images.push(newImage);
}

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Update and draw each image
  images.forEach((image, index) => {
    image.update();
    image.draw();

    // Check for collision with the invisible cursor rectangle
    if (
      image.y + image.height / 2 >= canvas.height - cursorRectHeight && // Bottom boundary
      image.x > cursorX && // Right boundary
      image.x < cursorX + cursorRectWidth // Left boundary
    ) {
      images.splice(index, 1); // Remove image if caught
      addResource("gold");
    }

    // Remove image if it goes off the bottom of the canvas
    if (image.y > canvas.height) {
      images.splice(index, 1); // Remove image if it leaves the screen
    }
  });

  // Draw the image on top of the invisible rectangle
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Transparent black with 50% opacity
  ctx.fillRect(
    cursorX,
    canvas.height - cursorRectHeight,
    cursorRectWidth,
    cursorRectHeight
  );

  // Optional: You can render the cursor rectangle as an image if needed
  const cursorImage = new Image();
  cursorImage.src = "./images/tray.png"; // Set the image for the cursor
  ctx.drawImage(
    cursorImage,
    cursorX,
    canvas.height - cursorRectHeight,
    cursorRectWidth,
    cursorRectHeight
  );

  requestAnimationFrame(update); // Call the next frame
}

// Control the cursor with the mouse
canvas.addEventListener("mousemove", (event) => {
  cursorX = event.clientX - cursorRectWidth / 2; // Center the rectangle on the cursor
});
canvas.addEventListener("touchmove", (event) => {
  const touch = event.touches[0]; // Get the first touch point
  cursorX = touch.clientX - cursorRectWidth / 2; // Center the rectangle on the touch point
  event.preventDefault(); // Prevent default scrolling or other touch behaviors
});

// Spawn images at a set interval
setInterval(createImage, 1000); // Create a new image every second

update(); // Start the game loop
