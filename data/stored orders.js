
export let orders=getOrdersFromLocal();

export function getOrdersFromLocal()
{
  const orders=(JSON.parse(localStorage.getItem('orders')));
  if(!orders)
    return []
  return orders;
}

export function clearOrder()
{
  orders=[];
  localStorage.removeItem('orders');
}

export function addOrder(order)
{
  orders.unshift(order);
  localStorage.setItem('orders',JSON.stringify(orders));
}

export function findOrder(orderId)
{
  for(let i=0;i<orders.length;i++)
  {
    const order=orders[i];
    if(orderId===order.id)
      return order;
  }
}

export function getProduct(order,productId)
{
  return order.products.find(product=>product.productId===productId);
}