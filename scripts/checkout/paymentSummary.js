import {cart,deliveryIdExistCart,cartTotalQty,clearCart, isCartEmpty } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { priceFormat,renameAttribute,deepCopyArray } from "../shared code.js";
import { deliveryOptions } from "../../data/delivery options.js";
import { addOrder } from "../../data/stored orders.js";

export  function renderPaymentSummary()
{
  const itemTotal=getTotalCartPrice(cart);
  const shippingTotal=getShippingTotal(deliveryOptions);
  const subTotal=itemTotal+shippingTotal;
  const tax=get10PrcntTax(subTotal);
  const orderTotal=subTotal+tax;

  document.querySelector('.js-payment-summary').innerHTML=
  `<div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div class="js-item-quantity">Items (${cartTotalQty()}):</div>
    <div class="payment-summary-money js-payment-summary-item">${priceFormat(itemTotal)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money js-payment-summary-shipping">${priceFormat(shippingTotal)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money js-payment-summary-subtotal">${priceFormat(subTotal)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money js-payment-summary-tax">${priceFormat(tax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money js-payment-summary-order-total">${priceFormat(orderTotal)}</div>
  </div>
    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button>
  `;
  placeOrderEventListener();
}

function getTotalCartPrice(cart)
{
  let total=0;
  cart.forEach((item)=>
  { 
    const product=findProduct(item.id);
    total=total+(product.priceCents*item.quantity);
  });
  return total;
}

function getShippingTotal(deliveryOptions)
{
  let shippingPrice=0;
  for(let i=0;i<deliveryOptions.length;i++)
  {
    if(deliveryIdExistCart(deliveryOptions[i].id))
      shippingPrice+=(deliveryOptions[i].priceCents);
  }
  return shippingPrice;
}

function get10PrcntTax(priceCents)
{
  return priceCents/10;
}

export function updateShippingPrice()
{
  const shippingElement=document.querySelector('.js-payment-summary-shipping');
  const subTotalElement=document.querySelector('.js-payment-summary-subtotal');
  const taxElement=document.querySelector('.js-payment-summary-tax');
  const orderTotalElement=document.querySelector('.js-payment-summary-order-total');
  
  const subTotalDollar=subTotalElement.innerHTML;
  const prevShippingDollar=shippingElement.innerHTML;
  let subTotal=Number(subTotalDollar.substring(1))*100;
  const prevShipping=Number(prevShippingDollar.substring(1))*100;

  const shippingPrice=getShippingTotal(deliveryOptions);
  shippingElement.innerHTML= priceFormat(shippingPrice);

  subTotal=subTotal-prevShipping+shippingPrice;
  subTotalElement.innerHTML= priceFormat(subTotal);
  taxElement.innerHTML= priceFormat(get10PrcntTax(subTotal));
  orderTotalElement.innerHTML= priceFormat(get10PrcntTax(subTotal)+subTotal);
}

export function updateItemPrice()
{
  const itemElement=document.querySelector('.js-payment-summary-item');
  const subTotalElement=document.querySelector('.js-payment-summary-subtotal');
  const taxElement=document.querySelector('.js-payment-summary-tax');
  const orderTotalElement=document.querySelector('.js-payment-summary-order-total');

  const subTotalDollar=subTotalElement.innerHTML;
  const prevItemDollar=itemElement.innerHTML;
  let subTotal=Number(subTotalDollar.substring(1))*100;
  const prevItem=Number(prevItemDollar.substring(1))*100;
  
  const itemPrice=getTotalCartPrice(cart);
  itemElement.innerHTML= priceFormat(itemPrice);
  
  subTotal=subTotal-prevItem+itemPrice;
  subTotalElement.innerHTML= priceFormat(subTotal);
  taxElement.innerHTML= priceFormat(get10PrcntTax(subTotal));
  orderTotalElement.innerHTML= priceFormat(get10PrcntTax(subTotal)+subTotal);
}

export function updateItemQtyPayment(itemQty)
{
  document.querySelector('.js-item-quantity').innerHTML="Items ("+itemQty+")";
  // console.log(document.querySelector('.js-item-quantity').innerHTML);
}

export async function  getOrder()
{
  let cartItems=deepCopyArray(cart);
  // cartItems=renameAttribute(cartItems,"deliveryId","deliveryOptionId");
  cartItems=renameAttribute(cartItems,"id","productId");
  const response=await fetch('https://supersimplebackend.dev/orders',
  {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({cart:cartItems})
  });
  const order=await response.json();
  return order;
}

function placeOrderEventListener()
{
  document.querySelector('.js-place-order-button').addEventListener('click',()=>
  {
    if(!isCartEmpty())
    {
      getOrder().then((order)=>
      {
        addOrder(order);
        window.location.href="orders.html";
        clearCart();
      });
    }
    else
      alert("Can't place order on empty Cart");
  });
} 