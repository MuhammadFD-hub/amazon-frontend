export let deliveryOptions=[
  {
    id:1,
    days:7,
    priceCents:0
  },
  {
    id:2,
    days:4,
    priceCents:499
  },
  {
    id:3,
    days:1,
    priceCents:999
  }
]
export function getDeliveryDays(deliveryId)
{
  const id= Number(deliveryId);
  for(let i=0;i<deliveryOptions.length;i++)
  {
    if(deliveryOptions[i].id===id)
      return deliveryOptions[i].days;
  };
}
export function deliveryIdExist(id)
{
  for(let i=0;i<deliveryOptions.length;i++)
  {
    if(deliveryOptions[i].id===id)
      return true;
  }
  return false;
}