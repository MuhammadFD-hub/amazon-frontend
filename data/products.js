export let  products;


export async function initializeProducts() {
  products = JSON.parse(localStorage.getItem('products')) || null;
  if (!products) {
    const data=await fetchBackendProducts();
    products=data;
    localStorage.setItem('products',JSON.stringify(products));
  }
  products=products.map((product)=>
    product.type ? new Clothing(product) : new Product(product)
  );
  return products;
}

export async function fetchBackendProducts()
{
  const data =await fetch('https://supersimplebackend.dev/products');
  return data.json();
}

export function findProduct(id)
{
  for(let i=0;i<products.length;i++)
  {
    const element=products[i];
    const tempId=element.id;
    if(tempId===id)
      return element;
  }
}

class Product
{
  id;
  image;
  name;
  rating;
  priceCents;
  constructor(product)
  {
    this.id=product.id;
    this.image=product.image;
    this.name=product.name;
    this.rating=product.rating;
    this.priceCents=product.priceCents;
  }
  getRating()
  {
    return this.rating.stars*10;
  }
  getCount()
  {
    return this.rating.count;
  }
  getPrice()
  {
    return"$"+(this.priceCents/100).toFixed(2);
  }
  getSizeChart(){return ''}
}

class Clothing extends Product
{
  sizeChartLink;
  constructor(product)
  {
    super(product);
    this.sizeChartLink=product.sizeChartLink;
  }
  getSizeChart()
  {
    return `<a href="${this.sizeChartLink}">Size chart</a>`;
  }
}