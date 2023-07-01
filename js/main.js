/********************** SET CURRENT IN THE FOOTER ****************/
// Insert year on the footer of the html
const year = document.getElementById("year");
const currentYear = new Date()
year.innerText = currentYear.getFullYear();

/********************* JSON DATA INITIAL INGESTION ***************/

const jsonData = "../data/products.json"
let dropDownItem = document.getElementById("dropdown-items")

// Insert items in the Drop-Down Menu
function initialDropdownItems(items) {
  items.forEach(item => {
    // Get Item name from name JSON field
    const itemName = item.name.toLowerCase();
    // Create option element
    const node = document.createElement("option");
    node.innerText = itemName;
    // Create Element Attributes
    node.setAttribute("value", itemName);
    node.setAttribute('class', 'cart-item');
    dropDownItem.append(node)
  })
}

fetch(jsonData)
  .then(response => response.json())
  .then(data => initialDropdownItems(data))
  .catch(err => console.log(err))

/*********************** ADD ITEMS TO CART **********************/

// Select item from a dropdown menu
const selectItem = document.getElementById("dropdown-items");

// Identify the name of the element selected from dropdown menu
selectItem.addEventListener('change', () => {
  console.log(selectItem.value)
})