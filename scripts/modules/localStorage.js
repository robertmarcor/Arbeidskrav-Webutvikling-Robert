import { ARMY_ARRAY } from "./army.js";
import { loadHeader } from "./header.js";
import { RESOURCES } from "./resources.js";

// LocalStorage Key Names
export const RESOURCE_KEY = "resources";
export const ARMY_KEY = "army";

let resourceDisplay;

async function setResourceDisplay() {
  await loadHeader();
  resourceDisplay = document.getElementById("resource");

  if (resourceDisplay) {
    console.log("Header loaded and resourceDisplay element found.");
    initializeData();
    updateResourceValue();
  } else {
    console.error("resourceDisplay element not found.");
  }
}

export function loadFromStorage(key, data) {
  console.log("Loading data...");
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (key === RESOURCE_KEY) {
      RESOURCES.gold = parsedData.gold;
      RESOURCES.metal = parsedData.metal;
      RESOURCES.wood = parsedData.wood;
      console.log(RESOURCES);
    } else if (key === ARMY_KEY) {
      ARMY_ARRAY.clothing = parsedData.clothing;
      ARMY_ARRAY.bag = parsedData.bag;
      ARMY_ARRAY.shoe = parsedData.shoe;
      console.log(ARMY_ARRAY);
    }
  } else {
    console.log(`No data for ${key} in localStorage, initializing...`);
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function updateResourceValue() {
  if (resourceDisplay) {
    resourceDisplay.textContent = RESOURCES.gold;
  }
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  updateResourceValue();
}

function initializeData() {
  loadFromStorage(RESOURCE_KEY, RESOURCES);
  loadFromStorage(ARMY_KEY, ARMY_ARRAY);
}

document.addEventListener("DOMContentLoaded", () => {
  setResourceDisplay();
});
