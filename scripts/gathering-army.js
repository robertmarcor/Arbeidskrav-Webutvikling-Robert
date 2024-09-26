import { clothingsArray } from "./modules/clothes.js";
import { bagsArray } from "./modules/bags.js";
import { shoesArray } from "./modules/shoes.js";
import { CART_ARRAY } from "./modules/cart.js";
import {
  ARMY_KEY,
  RESOURCE_KEY,
  saveToStorage,
} from "./modules/localStorage.js";
import { RESOURCES } from "./modules/resources.js";
import { inputContains } from "./utilities/filterUtil.js";

const clothingContainer = document.getElementById("warrior-container");
const shoesContainer = document.getElementById("machines-container");
const bagsContainer = document.getElementById("animals-container");

const filterInput = document.getElementById("filterInput");
if (filterInput) {
  filterInput.addEventListener("input", displayItemsForSale);
}

const itemsForSale = [
  { array: clothingsArray, container: clothingContainer },
  { array: bagsArray, container: shoesContainer },
  { array: shoesArray, container: bagsContainer },
];

function displayItemsForSale() {
  // Clear previous content
  clothingContainer.innerHTML = "";
  shoesContainer.innerHTML = "";
  bagsContainer.innerHTML = "";

  itemsForSale.forEach(({ array, container }, arrayIndex) => {
    const filteredItems = array.filter(inputContains);
    filteredItems.forEach((item, itemIndex) => {
      let html = "";
      html += ` 
      <article class="shop-display__card">
        <div class="relative">
          <img src="${item.imageURL}" class="shop-display__card-image" alt="${
        item.categoryBrand
      } ${item.categoryName}">
          <i id="favorite" class="fa-regular fa-heart absolute top-2 right-2"></i>
        </div>
        <h3 class="shop-display__card-brand text-gray-800">${
          item.categoryBrand
        }</h3>
        <h2 class="shop-display__card-name">${item.categoryName}</h2>
        <div class="flex justify-between py-2"> 
          <h4 class="shop-display__card-price font-semibold text-lg">${item.priceGold.toLocaleString()}.-</h4>
          <button class="bg-black text-white px-4" 
          id="buy-${item.identifier}-${arrayIndex}-${itemIndex}"> + Add
          </button>
        </div>
      </article>
    `;

      container.insertAdjacentHTML("beforeend", html);
      addButtons(item, `buy-${item.identifier}-${arrayIndex}-${itemIndex}`);
    });
  });
}
displayItemsForSale();

function addButtons(item, buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    buyItem(item);
  });
}

function canAfford(item) {
  return RESOURCES.gold >= item.priceGold;
}
function buyItem(item) {
  if (canAfford(item)) {
    RESOURCES.gold -= item.priceGold;
    saveToStorage(RESOURCE_KEY, RESOURCES);

    CART_ARRAY[item.identifier].push(item);
    saveToStorage(ARMY_KEY, CART_ARRAY);
    console.log(`Added ${item.categoryName} to the cart!`);
    displayPurchasedModal();
  } else {
    console.log("Not enough resources to buy this item.");
  }
}

function displayPurchasedModal() {
  const modal = document.getElementById("purchasedModal");

  const message = "Added To Cart!";
  document.getElementById("modalMessage").innerText = message;

  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 3000);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
