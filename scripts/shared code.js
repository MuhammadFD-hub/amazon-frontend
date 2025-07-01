import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cartTotalQty } from '../data/cart.js';

export function priceFormat(priceCents)
{
  return "$"+(priceCents/100).toFixed(2)
}
export function getId(element)
{
  return element.dataset.productId;
}
export function renameAttribute(arr, oldName, newName) {
  if (!Array.isArray(arr)) {
    console.error('The first argument must be an array of objects.');
    return [];
  }

  // Iterate over each object in the array
  arr.forEach(obj => {
    if (obj.hasOwnProperty(oldName)) {
      // Create the new attribute with the value of the old attribute
      obj[newName] = obj[oldName];
      // Delete the old attribute
      delete obj[oldName];
    } else {
      console.warn(`Attribute "${oldName}" does not exist on one of the objects.`);
    }
  });

  return arr;
}

export function dateFormat(date)
{
  return dayjs(date).format('MMMM D');
}

export function deepCopyArray(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function cartIconQtyUpdate()
{
  let cartIcon=document.querySelector(".js-cart-quantity");
  cartIcon.innerHTML=cartTotalQty();
}