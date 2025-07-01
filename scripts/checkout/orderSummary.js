import { cart, deleteInCart, updateInCart, updateDeliveryOption, cartTotalQty } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { getId, priceFormat } from "../shared code.js";
import { deliveryOptions, getDeliveryDays } from "../../data/delivery options.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateShippingPrice, updateItemQtyPayment, updateItemPrice } from "./paymentSummary.js";
import { updateItemQtyCheckout } from "../checkout header.js";

function generateCartListHtml()
{
  let itemListHtml='';
  cart.forEach((item)=>
  {
    let product=findProduct(item.id);
    const currDate=dayjs()
    itemListHtml+=
    `<div class="cart-item-container js-cart-item-container-${product.id}">
      <div class="delivery-date js-delivery-date-${product.id}">
        Delivery date: ${getFutureDate(currDate,getDeliveryDays(item.deliveryId))}
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${product.image}>
  
        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            ${product.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${product.id}">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"data-product-id=${product.id}>
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input js-quantity-input-${product.id}"data-product-id=${product.id}>
            <span class="save-quantity-link link-primary js-save-quantity-link"data-product-id=${product.id}>
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link"data-product-id=${product.id}>
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          ${getDeliveryOptionHtml(deliveryOptions,item)}
        </div>
      </div>
    </div>`;
  })
  return itemListHtml;
}

function getDeliveryOptionHtml(deliveryOptions,item)
{
  let html='';
  deliveryOptions.forEach((deliveryOption)=>
  {
    const price=displayDeliveryOptionPrice(deliveryOption, item);
    const currDate=dayjs();
    html+=`<div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option js-delivery-option-${deliveryOption.id}">
      <input type="radio" ${item.deliveryId===deliveryOption.id?"checked":""}
        class="delivery-option-input js-delivery-option-input"
        name="delivery-option-${item.id}"data-delivery-id=${deliveryOption.id}>
      <div>
        <div class="delivery-option-date">
          ${getFutureDate(currDate,deliveryOption.days)}
        </div>
        <div class="delivery-option-price">
          ${price} Shipping
        </div>
      </div>
    </div>`
  });
  return html;
}

function initializeInputs()
{
  const allInputs=document.querySelectorAll('.js-quantity-input');
  allInputs.forEach((input)=>
  {
    const id=getId(input);
    input.value=document.querySelector(`.js-quantity-label-${id}`).innerHTML;
  });
}

function displayDeliveryOptionPrice(deliveryOption)
{
  const price=deliveryOption.priceCents;
  if(price===0)
    return "FREE";
  else
    return priceFormat(deliveryOption.priceCents)+" -";
}

export function getFutureDate(dayjsObj,days)
{
  return handleWeekends(dayjsObj.add(days,'days')).format('dddd, MMMM D');
}

function updateDeliveryDate(date,itemId)
{
  document.querySelector('.js-delivery-date-'+itemId).innerHTML="Delivery date: "+date;
}

function handleWeekends(dayjsObj)
{
  const day=dayjsObj.format('dd');
  if(day==='Sa')
    return dayjsObj=dayjsObj.add(2,'days');
  else if(day==='Su')
    return dayjsObj=dayjsObj.add(1,'days');
  else
  return dayjsObj;
} 

function handleUpdate(updateLink)
{
  const id=getId(updateLink);
  const container=document.querySelector(`.js-cart-item-container-${id}`);
  container.classList.add("is-editing-quantity");
}

function handleSave(saveLink)
{
  const id=getId(saveLink);
  const inputElement=document.querySelector(`.js-quantity-input-${id}`);
  const quantity=Number(inputElement.value);
  if(quantity===0)
    deleteItem(id);
  else if(quantity >=1&&quantity <=1000)
    updateInCart(id,quantity);
  else
  {
    alert("Quantity must be between 1 and 1000!");
    return;
  }
  updateItemPrice();
  const quatityElement=document.querySelector(`.js-quantity-label-${id}`);
  const container=document.querySelector(`.js-cart-item-container-${id}`);

  quatityElement.innerHTML=String(quantity);
  container.classList.remove("is-editing-quantity");
  updateItemQtyPayment(cartTotalQty());
}

function handleDelete(delLink)
{
  const delLinkId=getId(delLink);
  deleteItem(delLinkId);
  updateShippingPrice();
  // document.querySelector(".js-order-summary").innerHTML=generateCartListHtml();
  // bindDeleteListeners();
}

function handleRadioOption(inputElement)
{
  const name=inputElement.name;
  const currDate=dayjs();
  const deliveryId=Number(inputElement.dataset.deliveryId);
  const itemId=name.substring(16,name.length);
  updateDeliveryOption(itemId,deliveryId);
  updateDeliveryDate(getFutureDate(currDate,getDeliveryDays(deliveryId)),itemId);updateShippingPrice();
}

function deleteItem(id)
{
  deleteInCart(id);
  document.querySelector(`.js-cart-item-container-${id}`).remove();
  updateItemQtyCheckout(cart.length);
  updateItemQtyPayment(cart.length);
  updateItemPrice();
}

//This is the main code
export function renderOrderSummary()
{
  updateItemQtyCheckout(cart.length);

  document.querySelector(".js-order-summary").innerHTML=generateCartListHtml();
  initializeInputs();

  document.querySelector(".js-order-summary").addEventListener("click", event=> 
  {
    if (event.target.classList.contains('js-delete-quantity-link'))
      handleDelete(event.target);
    else if (event.target.classList.contains('js-update-quantity-link'))
      handleUpdate(event.target);
    else if (event.target.classList.contains('js-save-quantity-link'))
      handleSave(event.target);
    else if (event.target.classList.contains('js-delivery-option-input'))
      handleRadioOption(event.target);
  });

  document.querySelector(".js-order-summary").addEventListener("keypress", (event)=>
  {
    if(event.target.classList.contains('js-quantity-input') && event.key==='Enter')
      handleSave(event.target);
  });
}