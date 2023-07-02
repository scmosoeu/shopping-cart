// DEFINE UI VARIABLES 
let dropDownItem = document.getElementById("dropdown-items");
const fieldSet = document.querySelector("#check-items");
const selectItem = document.getElementById("dropdown-items");
const addBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelector(".delete-btn");


// DEFINE CONSOLE VARIABLES
// Array of items selected
let chosenItems = [];

// SET CURRENT IN THE FOOTER 
// Insert year on the footer of the html
const year = document.getElementById("year");
const currentYear = new Date()
year.innerText = currentYear.getFullYear();

// JSON DATA INITIAL INGESTION 

const jsonData = "../data/products.json"

// Insert items in the Drop-Down Menu
function insertDropdownItems(items) {
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
.then(data => insertDropdownItems(data))
.catch(err => console.log(err))

// EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  // Add item to cart
  addBtn.addEventListener('click', addCartItem);
  // Select item from cart
  fieldSet.addEventListener('click', selectCartItem);
  // Remove item from cart
  deleteBtn.addEventListener('click', removeCartItem);
}

// ADD ITEMS TO CART 
function addCartItem(e) {
  
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

  e.preventDefault();
}

// SELECT ITEMS IN CART 
function selectCartItem(e) {
  if(e.target.type === 'checkbox') {
    // const checkBox = document.querySelectorAll('input[type="checkbox"]:checked')

    // Get the label tag
    const labelElement = e.target.nextElementSibling;
    if(e.target.checked) {
      // Scratch the label
      labelElement.style.textDecoration = "line-through";
      labelElement.style.fontWeight = "bold";
    } else {
      // Default style
      labelElement.style.textDecoration = "none";
      labelElement.style.fontWeight = "normal";
    }
  }
}

// REMOVE ITEMS FROM CART 
function removeCartItem(e) {

  e.preventDefault();

  // Select checked items
  const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked')
  
  // For each selected item get the labels and delete
  checkedItems.forEach(checkedItem => {

    const checkedLabel = checkedItem.nextElementSibling;
    const labelName = checkedLabel.textContent;
    insertDropdownItems([
      {
        name: labelName
      }
    ]);

    checkedLabel.remove();
    checkedItem.remove();
  })

  e.preventDefault();
}