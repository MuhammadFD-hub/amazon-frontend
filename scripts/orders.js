import { orders, clearOrder } from "../data/stored orders.js";
import { findProduct, initializeProducts } from "../data/products.js";
import {
  priceFormat,
  dateFormat,
  getId,
  cartIconQtyUpdate,
} from "./shared code.js";
import { addInCart, clearCart } from "../data/cart.js";

function generateOrderHtml() {
  let html = "";
  orders.forEach((order) => {
    html += `<div class="order-container">     
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dateFormat(order.orderTime)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${priceFormat(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${generateProductHtml(order)}
      </div>
    </div>`;
  });
  return html;
}

function generateProductHtml(order) {
  let htmls = "";
  const items = order.products;
  for (let i = 0; i < items.length; i++) {
    const product = findProduct(items[i].productId);
    htmls += `<div class="product-image-container">
      <img src=${product.image}>
    </div>

    <div class="product-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dateFormat(items[i].estimatedDeliveryTime)}
      </div>
      <div class="product-quantity">
        Quantity: ${items[i].quantity}
      </div>
      <a href="checkout.html">
        <button class="buy-again-button js-buy-again-button button-primary"data-product-id=${
          product.id
        }>
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </a>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>`;
  }
  return htmls;
}

initializeProducts().then(() => {
  document.querySelector(".js-orders-grid").innerHTML = generateOrderHtml();
  cartIconQtyUpdate();
  makeBuyAgainInteractive();
});

function makeBuyAgainInteractive() {
  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = getId(button);
      clearCart();
      addInCart(productId, 1);
    });
  });
}
