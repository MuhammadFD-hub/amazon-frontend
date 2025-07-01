# 🛒 Amazon Frontend Clone – Ecommerce Demo

This is a frontend-only ecommerce demo project that simulates key user interactions such as browsing products, adding items to the cart, placing orders, and selecting shipping options. It uses the **MVC pattern** and a **modular structure**.  
*Note: Backend functionality is not included.*

</br>
</br>

## 🚀 How to Run

1. Download all project files  
2. Open `amazon.html` in VS Code  
3. Right-click the file and select **“Open with Live Server”**  
   *(Requires [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer))*



## 🛠️ Tech Stack

- HTML  
- CSS  
- JavaScript (Vanilla)



## 📁 Project Structure

### HTML files
- HTML structure for the page  
- Contains containers (`<div>`) for dynamic content populated by JavaScript

### `/data/`
- JavaScript files for managing objects such as products, orders, cart items, and shipping options
- Contains functions which are related to their object  
- Functions follow logical naming patterns like `findProduct()`, `addOrder()` etc.

### `/images/`
- Contains all static assets, including product images  
- Products reference images via path strings, not embedded data

### `/scripts/`
- Handles UI-related functions like:
  - `generateAmazonHTML()`
  - `displayAddedMsg()`  
- These scripts import:
  - Object data/functions from `/data/`
  - HTML generation logic  
- Used to dynamically generate DOM content and attach event listeners using object functions and UI-related functions



## 🔄 How It Works (Procedure)

1. HTML files include static layout and placeholders for dynamic content
2. JavaScript imports objects from `/data/`
3. For each object (e.g., product), the script:
   - Loops through items
   - Generates HTML using object properties
   - Appends the combined HTML to a target container via `querySelector()`
4. Event listeners are added to dynamically generated elements to support features like:
   - Add to cart  
   - Show “added” message briefly  
   - Remove from cart  
   - Place order

## 📌 Notes

- The project demonstrates clean separation of data, logic, and UI  
- Suitable for demonstrating JS fundamentals, modularity, and DOM manipulation 

## 📄 License

This project is licensed under a **proprietary license**.  
It is available for **educational and demonstration purposes only**.  
Use, redistribution, or modification is **not permitted without written consent**.

