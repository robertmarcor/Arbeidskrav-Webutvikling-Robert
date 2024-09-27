import { cartItems } from "./modules/cart.js";
import { ARMY_KEY, loadFromStorage } from "./modules/localStorage.js";
import { inputContains } from "./utilities/filterUtil.js";

const clothingContainer = document.getElementById("warrior-container");
const shoesContainer = document.getElementById("machines-container");
const bagsContainer = document.getElementById("animals-container");
const spentOnItems = document.getElementById("worth");
const filterInput = document.getElementById("filterInput");
if (filterInput) {
  filterInput.addEventListener("input", displayShoppingCart);
}

function displayShoppingCart() {
  loadFromStorage(ARMY_KEY, cartItems);
  let totalSpent = 0;

  clothingContainer.innerHTML = "";
  shoesContainer.innerHTML = "";
  bagsContainer.innerHTML = "";

  for (const category in cartItems) {
    const itemArray = cartItems[category].filter(inputContains);
    let html = "";

    itemArray.forEach((item) => {
      html += `
       <article class="shop-display__card">
          <img src="${item.imageURL}" class="shop-display__card-image">
          <h2 class="shop-display__card-name">${item.categoryName}</h2>
          <h3 class="shop-display__card-brand">${item.categoryBrand}</h3>
          <h4 class="shop-display__card-price font-semibold text-lg">${item.priceGold.toLocaleString()}.-</h4>
         </article>   
      `;
      totalSpent += item.priceGold;
    });

    if (category === "clothing") {
      clothingContainer.innerHTML += html;
    } else if (category === "shoe") {
      shoesContainer.innerHTML += html;
    } else if (category === "bag") {
      bagsContainer.innerHTML += html;
    }
  }
  spentOnItems.textContent = `$ ${totalSpent.toLocaleString()} $`;
}

displayShoppingCart();
