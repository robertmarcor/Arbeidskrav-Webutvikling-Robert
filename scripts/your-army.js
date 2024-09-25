import { ARMY_ARRAY } from "./modules/army.js";
import { loadFromStorage } from "./modules/localStorage.js";

const clothingContainer = document.getElementById("warrior-container");
const shoesContainer = document.getElementById("machines-container");
const bagsContainer = document.getElementById("animals-container");
const spentOnItems = document.getElementById("worth");

function displayArray() {
  loadFromStorage("army", ARMY_ARRAY);
  let totalSpent = 0;
  for (const category in ARMY_ARRAY) {
    const itemArray = ARMY_ARRAY[category];
    let html = "";
    itemArray.forEach((item) => {
      html += `
        <div class="item">
          <img src="${item.imageURL}" alt="${item.categoryName}" />
          <h2>${item.categoryName}</h2>
          <p>Brand: ${item.categoryBrand}</p>
          <p>Worth:<span class="font-bold"> ${item.priceGold}$ </span></p>
        </div>
      `;
      totalSpent += item.priceGold;
    });

    if (category === "clothing") {
      clothingContainer.innerHTML = html;
    } else if (category === "shoe") {
      shoesContainer.innerHTML = html;
    } else if (category === "bag") {
      bagsContainer.innerHTML = html;
    }
  }
  spentOnItems.textContent = `$ ${totalSpent.toLocaleString()} $`;
}

displayArray();
