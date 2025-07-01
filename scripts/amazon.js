import { products, initializeProducts } from "../data/products.js";
import { addInCart, cartTotalQty } from "../data/cart.js";
import { getId } from "./shared code.js";
let interval;
const addedMsgTimeout = {};
let cartIcon = document.querySelector(".js-cart-quantity");
cartIcon.innerHTML = cartTotalQty();
//All functions
const skipItems = [
  "5968897c-4d27-4872-89f6-5bcb052746d7",
  "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
  "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
];
function generateAmazonHtml() {
  let html = "";
  products.forEach((product) => {
    if (skipItems.includes(product.id)) return;
    html += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src=${product.image}>
    </div>
  
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>
  
    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.getRating()}.png">
      <div class="product-rating-count link-primary">
        ${product.getCount()}
      </div>
    </div>
  
    <div class="product-price">
      ${product.getPrice()}
    </div>
  
    <div class="product-quantity-container js-product-quantity-container-${
      product.id
    }">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  
    <div class="product-spacer"></div>
    
    ${product.getSizeChart()}
    <div class="added-to-cart js-added-to-cart"data-product-id=${product.id}>
      <img src="images/icons/checkmark.png">
      Added
    </div>
    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id=${
      product.id
    }>
      Add to Cart
    </button>
  </div>`;
  });
  return html;
}

function findElement(elementArray, id) {
  for (let i = 0; i < elementArray.length; i++) {
    const element = elementArray[i];
    const tempId = getId(element);
    if (tempId === id) return element;
  }
}

function displayAddedMsg(msgElement, buttonId) {
  msgElement.classList.add("added-to-cart-visible");
  const prevInterval = addedMsgTimeout[buttonId];
  if (prevInterval) clearTimeout(prevInterval);
  interval = setTimeout(
    () => msgElement.classList.remove("added-to-cart-visible"),
    750
  );
  addedMsgTimeout[buttonId] = interval;
}

function getSelectedQty(buttonId) {
  const container = document.querySelector(
    `.js-product-quantity-container-${buttonId}`
  );
  const selectedElement = container.querySelector("select");
  const value = Number(selectedElement.value);
  selectedElement.selectedIndex = 0;
  return value;
}

//This is the main code

function renderAmazon() {
  document.querySelector(".js-products-grid").innerHTML = generateAmazonHtml();

  let allButtonElement = document.querySelectorAll(".js-add-to-cart-button");
  let allAddedItemMsgElement = document.querySelectorAll(".js-added-to-cart");

  allButtonElement.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      let cartIconQty = Number(cartIcon.innerHTML);
      const buttonId = getId(buttonElement);
      const selectedQty = getSelectedQty(buttonId);
      addInCart(buttonId, selectedQty);
      cartIconQty += selectedQty;
      cartIcon.innerHTML = cartIconQty;

      const reqMsgElement = findElement(allAddedItemMsgElement, buttonId);
      displayAddedMsg(reqMsgElement, buttonId);
    });
  });
}

// loadBackendProducts(()=>
// {
//   renderAmazon();
// });

initializeProducts().then(() => {
  renderAmazon();
});
