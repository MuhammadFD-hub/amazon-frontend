import { initializeProducts,findProduct } from "../data/products.js"
import { findOrder,getProduct } from "../data/stored orders.js"
import { dateFormat,cartIconQtyUpdate } from "./shared code.js";

function generateTrackingHtml()
{
  const url=new URL(window.location.href);
  
  const productId=url.searchParams.get('productId');
  const order=findOrder(url.searchParams.get('orderId'));

  const fullProductInfo=findProduct(productId);
  const orderProduct=getProduct(order,productId);
  return `<div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dateFormat(orderProduct.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${fullProductInfo.name}
    </div>

    <div class="product-info">
      Quantity: ${orderProduct.quantity}
    </div>

    <img class="product-image" src=${fullProductInfo.image}>

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </div>`
}
initializeProducts().then()
{
  document.querySelector('.js-main').innerHTML=generateTrackingHtml();
  cartIconQtyUpdate();
}
