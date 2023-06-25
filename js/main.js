let jsonData = "../data/products.json"

let dropDownItem = document.getElementById("dropdown-items")

// fetch(jsonData)
//     .then((response) => response.json())
//     .then((data) => {
//         data.forEach(item => {
//             console.log(item.name)
//         })
//     })
//     .catch((err) => console.log(err))

fetch(jsonData)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(item => {
            const itemValue = String(item.name).toLowerCase();
            // Create a label
            const node = document.createElement("option");
            const textnode = document.createTextNode(item.name);
            node.appendChild(textnode)
            node.setAttribute("value", itemValue)

            dropDownItem.appendChild(node)
        })
    })
    .catch((err) => console.log(err))
