import { RESOURCES } from "./modules/resources.js";
import { clothingItems } from "./modules/clothes.js";
import { bagItems } from "./modules/bags.js";
import { shoeItems } from "./modules/shoes.js";
import { cartItems } from "./modules/cart.js";
import {
  CART_KEY,
  RESOURCE_KEY,
  saveDataToLocalStorage,
} from "./modules/localStorage.js";
import { matchesFilterByInput } from "./utilities/filterUtil.js";

// For placing html
const clothingContainer = document.getElementById("warrior-container");
const shoesContainer = document.getElementById("machines-container");
const bagsContainer = document.getElementById("animals-container");

// Checks if theres a inputfield in the DOM
getFilterInputField();

const itemsForSale = [
  { items: clothingItems, container: clothingContainer },
  { items: bagItems, container: shoesContainer },
  { items: shoeItems, container: bagsContainer },
];

function displayItemsForSale() {
  clothingContainer.innerHTML = "";
  shoesContainer.innerHTML = "";
  bagsContainer.innerHTML = "";

  /**
   * Loops through an array of items and renders HTML dynamically
   * @param {Array} items - items to place
   * @param {HTMLElement} container - where the items should be placed
   */
  itemsForSale.forEach(({ items, container }, arrayIndex) => {
    //Creates a new array and filters items if theres input from the user in the inputField
    let filteredItemsForSale = items.filter(matchesFilterByInput);

    // itemIndex used adding buttonsHandlers
    filteredItemsForSale.forEach((item, itemIndex) => {
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
          <h2 class="shop-display__card-name min-h-12 md:min-h-0">${
            item.categoryName
          }</h2>
          <div class="flex justify-between py-2"> 
            <h4 class="shop-display__card-price font-semibold text-lg">${item.priceGold.toLocaleString()}.-</h4>
            <button class="bg-black text-white px-4 whitespace-nowrap" 
            id="buy-button-${item.identifier}-${itemIndex}"> + Add
            </button>
          </div>
      </article>
    `;
      container.insertAdjacentHTML("beforeend", html);
      attachButtonHandlers(item, `buy-button-${item.identifier}-${itemIndex}`); // Button naming example: buy-button-clothing-1
    });
  });
}
displayItemsForSale();

// Add unique buttons to each item so we can target selected object
function attachButtonHandlers(item, buttonId) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    buySelected(item);
  });
}

function canPurchase(item) {
  return RESOURCES.gold >= item.priceGold;
}

function buySelected(item) {
  if (canPurchase(item)) {
    RESOURCES.gold -= item.priceGold;
    saveDataToLocalStorage(RESOURCE_KEY, RESOURCES);

    cartItems[item.identifier].push(item);
    saveDataToLocalStorage(CART_KEY, cartItems);
    console.log(`Added ${item.categoryName} to the cart!`);

    displayPopupModal();
  } else {
    console.log("Not enough to buy this item.");
    displayPopupModal("Not enough Bonus");
  }
}

function getFilterInputField() {
  const filterInput = document.getElementById("filterInput");
  if (filterInput) {
    filterInput.addEventListener("input", displayItemsForSale);
  } else {
    console.log("No Input field for filter present");
    /* Should ther be one? add if missing maybe? */
  }
}

function displayPopupModal(text) {
  const modal = document.getElementById("popup-modal");

  let message = "Added To Cart!";
  if (text) message = text;
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
