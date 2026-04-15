
const buttonShowAll = document.querySelector('.show-all')
const mapShowAll = document.querySelector('.map-all')
const list = document.querySelector('.menu-list');
const reduceShowAll = document.querySelector('.reduce-all')
const filterShowAll = document.querySelector('.filter-all')
const cart = []
const cartList = document.querySelector('.cart-list')
const clearCartButton = document.querySelector('.clear-cart')

let currentMenu = menuOptions

function showAll(menuArray) {
    currentMenu = menuArray
    let myLi = ""

    menuArray.forEach(item => {
        myLi += `
        <li>
            ${item.oldPrice ? `<span class="promoçao">10% de Desconto</span>` : ""}

            <img class="img-x-salada" src="${item.src}">
            <p> ${item.name}</p>
             ${item.oldPrice
                ? `<p class="old-price">R$ ${formatPrice(item.oldPrice)}</p>`
                : ""
            }
            <p class="item-price"> R$ ${formatPrice(item.price)}</p>
            <button class="add-button" onclick="addToCart('${item.name}')">
                Adicionar
            </button>
        </li>
        `
    });

    list.innerHTML = myLi

}

function renderCart() {
    let cartItems = ""

    cart.forEach(item => {
        cartItems += `
            <li>
                <p>${item.name} x${item.quantity}</p>
                <p>Preço unitário: R$ ${formatPrice(item.price)}</p>
                <p class="price-total">Subtotal: R$ ${formatPrice(item.price * item.quantity)}</p>
                <button onclick="removeFromCart('${item.name}')">
                    Remover
                </button>
            </li>
        `
    })

    cartList.innerHTML = cartItems
}

function updateCartTotal() {
    const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    document.querySelector('.cart-total').innerHTML =
        `Total: R$ ${formatPrice(total)}`
}


function addToCart(itemName) {
    const selectionItem = currentMenu.find(item => item.name === itemName)

    const existingItem = cart.find(item => item.name === itemName)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            ...selectionItem,
            quantity: 1
        })
    }

    renderCart()
    updateCartTotal()
}

function removeFromCart(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName)

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1
        } else {
            cart.splice(itemIndex, 1)
        }
    }

    renderCart()
    updateCartTotal()
}


function filterAllItems() {
    const burguerVegan = menuOptions.filter(item => item.vegan === true)


    showAll(burguerVegan)
}


function mapAllItems() {
    const newPrices = menuOptions.map(item => ({
        ...item,
        oldPrice: item.price,
        price: item.price * 0.9
    }))


    showAll(newPrices)


}

function reduceAllItems() {
    const newPrices1 = menuOptions.reduce((acc, item) => {
        return acc + item.price * 0.9
    }, 0)



    list.innerHTML = `
    <li style="text-align: center;">
        <p>Valor total do lanche com desconto é:</p>
        <p class="item-price"> R$ ${formatPrice(newPrices1)}</p>
    </li>
`
}




function formatPrice(value) {
    return value.toFixed(2).replace(".", ",")
}



buttonShowAll.addEventListener("click", () => showAll(menuOptions))
mapShowAll.addEventListener("click", mapAllItems)
reduceShowAll.addEventListener("click", reduceAllItems)
filterShowAll.addEventListener("click", filterAllItems)


document.querySelector('.clear-cart').addEventListener('click', () => {
    cart.length = 0
    renderCart()
    updateCartTotal()
})
