let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');
let addToCartButtons = document.querySelectorAll('.pbtn');

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        cartItem.classList.add('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    });
});

let viewContainer = document.querySelector('.view-product');
let viewBox = viewContainer.querySelectorAll('.view');

document.querySelectorAll('.box-container .box').forEach(product => {
    product.onclick = (event) => {
        if (!event.target.classList.contains('pbtn')) {
            viewContainer.style.display = 'flex';
            let name = product.getAttribute('data-name');
            viewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (name == target) {
                    preview.classList.add('active');
                }
            });
        }
    };
});


viewBox.forEach(close => {
    close.querySelector('.fa-times').onclick = () => {
        close.classList.remove('active');
        viewContainer.style.display = 'none';
    };
});

//Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Making function
function ready() {
    //remove items from cart
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)

    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //quantity changes

    let quantityInputs = document.getElementsByClassName('cart-quantiy')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    let cartItem = buttonClicked.parentElement;
    let priceElement = cartItem.getElementsByClassName('cart-price')[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    cartItem.remove();
    updateTotal(-price); // Subtract the price of the removed product from the total
}
//Add to cart
const boxes = document.getElementsByClassName('box');

// Loop through each box and attach the click event
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let addButton = box.getElementsByClassName('pbtn')[0];
    addButton.addEventListener('click', addCartClicked);
}

function addCartClicked(event) {
    let button = event.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    let priceElement = shopProduct.getElementsByClassName("price")[0]
    let priceText = priceElement.innerText.trim();
    let priceSplice = priceText.split(' ')[0];
    console.log('priceElement', priceSplice)
    alert("Added To Cart Successfully!!");

    let productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    console.log(title, priceSplice, productImg)
    addProductToCart(title, productImg, priceSplice);
    updateTotal();
}

// Add event listener to the "add to cart" button
let addToCartButton = document.querySelector(".pbtn");
addToCartButton.addEventListener("click", addCartClicked);



function addProductToCart(title, productImg, priceSplice) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-item');
    let cartItems = document.getElementsByClassName('cart-items-container')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('You have already added this item to cart');
            return;
        }
    }
    let cartBoxContent = `
        <span class="fas fa-times cart-remove"></span>
        <img src="${productImg}" alt="">
        <div class="content">
            <h3 class="cart-product-title">${title}</h3>
            <div class="cart-price">${priceSplice}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>`;

    cartShopBox.innerHTML = cartBoxContent;

    let totalElement = cartItems.getElementsByClassName('total')[0];
    cartItems.insertBefore(cartShopBox, totalElement);

    let cartRemoveElement = cartShopBox.getElementsByClassName('cart-remove')[0];
    if (cartRemoveElement) {
        cartRemoveElement.addEventListener('click', removeCartItem);
    } else {
        console.error("Could not find cart-remove element");
    }

    let cartQuantityElement = cartShopBox.getElementsByClassName('cart-quantity')[0];
    if (cartQuantityElement) {
        cartQuantityElement.addEventListener('change', quantityChanged);
    } else {
        console.error("Could not find cart-quantity element");
    }
}


//Update total

function updateTotal(priceChange = 0) {
    let cartContent = document.getElementsByClassName('cart-items-container')[0];
    let cartItems = cartContent.getElementsByClassName('cart-item');
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i];
        let priceElement = cartItem.getElementsByClassName('cart-price')[0];
        let quantityElement = cartItem.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    total += priceChange; // Apply the price change (negative price) to subtract from the total

    // If the total goes below zero, set it to zero
    if (total < 0) {
        total = 0;
    }

    document.getElementsByClassName('total-price')[0].innerText = "$" + total.toFixed(2);
}

function openPaymentForm() {
    window.open('payment.html', '_blank');
}

function displayAlert() {
    alert("Payment successful!");
    window.close();
}