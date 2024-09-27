import { cartItems } from "./cart.js";
import { loadHeader } from "./header.js";
import { RESOURCES } from "./resources.js";

// LocalStorage Key Names
export const RESOURCE_KEY = "resources";
export const CART_KEY = "army";

let resourceElement;

async function initializeLocalStorage() {
  await loadHeader();
  initializeData();
  resourceElement = document.getElementById("resource");
  /* TODO, add failsafe to create element if missing */
  updateResourceValue();
}

export function retrieveDataFromLocalStorage(key, value) {
  console.log("Loading data...");
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (key === RESOURCE_KEY) {
      RESOURCES.gold = parsedData.gold;
      RESOURCES.metal = parsedData.metal;
      RESOURCES.wood = parsedData.wood;
      console.log(RESOURCES);
    } else if (key === CART_KEY) {
      cartItems.clothing = parsedData.clothing;
      cartItems.bag = parsedData.bag;
      cartItems.shoe = parsedData.shoe;
      console.log(cartItems);
    }
  } else {
    console.log(`No entry for ${key} in localStorage, initializing...`);
    // Create the data if no data found
    saveDataToLocalStorage(key, value);
  }
}

function updateResourceValue() {
  if (resourceElement) {
    resourceElement.textContent = RESOURCES.gold;
    // Add other resources here
  } else {
    console.console.error("resource element missing");
  }
}

export function saveDataToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  updateResourceValue();
}

function initializeData() {
  // Probably should add a loop to load all data from localStorage
  retrieveDataFromLocalStorage(RESOURCE_KEY, RESOURCES);
  retrieveDataFromLocalStorage(CART_KEY, cartItems);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLocalStorage();
});
