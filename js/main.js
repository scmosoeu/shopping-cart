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
    node.setAttribute("id", itemName);
    node.setAttribute('class', 'cart-item');
    dropDownItem.append(node)
  })
}

fetch(jsonData)
.then(response => response.json())
.then(data => initialDropdownItems(data))
.catch(err => console.log(err))

/*********************** ADD ITEMS TO CART **********************/

// Select fieldset item
const fieldSet = document.querySelector("#check-items");

// Select item from a dropdown menu
const selectItem = document.getElementById("dropdown-items");

// Select a button element
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener('click', e => {
  e.preventDefault();
  // Get the item name selected from the dropdown menu
  itemName = selectItem.value;

  // Get the selected item from dropdown menu and remove it
  const selectedItem = document.getElementById(itemName);
  selectedItem.remove()
  
  // Create a paragraph element
  const p = document.createElement('p');
  p.innerHTML = `
    <input type="checkbox" name="perishables" id="${itemName}" value="${itemName}">
    <label for="${itemName}">${itemName}</label>
  `
  fieldSet.appendChild(p)
})

/******************* REMOVE ITEMS FROM CART **********************/
// Array of items selected
let chosenItems = [];

fieldSet.addEventListener('click', e => {
  if(e.target.type === 'checkbox') {
    const checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

    // Get the label tag
    const labelElement = e.target.nextElementSibling;
    if(e.target.checked) {
      // Scratch the label
      labelElement.style.textDecoration = "line-through";
    } else {
      // Default style
      labelElement.style.textDecoration = "none";
    }
    
    chosenItems = Array.from(checkBox).map(x => x.value)
    console.log(chosenItems)
  }
})


