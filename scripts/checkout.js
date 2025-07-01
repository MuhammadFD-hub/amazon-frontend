import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { initializeProducts } from "../data/products.js";

initializeProducts().then(()=>
{
  renderOrderSummary();
  renderPaymentSummary();
});
