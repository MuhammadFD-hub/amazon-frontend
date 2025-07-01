export let cart=getCartFromLocal();

class Item
{
  id;
  quantity;
  deliveryId;
  
  constructor(item)
  {
    this.id=item.id;
    this.quantity=item.quantity;
    this.deliveryId=item.deliveryId;
  }
}


export function saveCartToLocal()
{
  localStorage.setItem("cart",JSON.stringify(cart));
}
export function getCartFromLocal()
{
  const cart=JSON.parse(localStorage.getItem("cart"));
  if(!cart)
    return [];
  return cart;
}
export function addInCart(itemId,qty)
{
  let exist=false;
  for(let i=0;i<cart.length;i++)
  {
    if(cart[i].id===itemId)
    {
      cart[i].quantity+=qty;
      exist=true;
      break;
    }
  }
  if(!exist)
    cart.push(new Item({id:itemId,quantity:qty,deliveryId:1}));
  saveCartToLocal();
} 
export function deleteInCart(id)
{
  cart=cart.filter(cart=>cart.id!==id);
  saveCartToLocal();
}
export function cartTotalQty()
{
  let total=0;
  cart.forEach((item)=>total+=item.quantity)
  return total;
}
export function updateInCart(itemId,qty)
{
  if(qty >=1&&qty <=1000)
  {
    for(let i=0;i<cart.length;i++)
    {
      if(cart[i].id===itemId)
      {
        cart[i].quantity=qty;
        break;
      }
    }
    saveCartToLocal();
  }
  else if(quantity===0)
    deleteInCart(itemId);
  else
    alert("Quantity must be between 1 and 1000!");
}

export function updateDeliveryOption(itemId,deliveryId)
{
  for(let i=0;i<cart.length;i++)
  {
    if(cart[i].id===itemId)
    {
      cart[i].deliveryId=deliveryId;
      break;
    }
  }
  saveCartToLocal();
}

export function deliveryIdExistCart(id)
{
  for(let i=0;i<cart.length;i++)
  {
    if(cart[i].deliveryId===id)
      return true;
  }
  return false;
}

export function clearCart()
{
  cart=[];
  localStorage.removeItem('cart');
}

export function isCartEmpty()
{
  if(cart.length===0)
    return true;
  else
  return false;
}