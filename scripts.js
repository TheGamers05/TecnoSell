// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        product.addEventListener('click', () => {
            alert('Producto seleccionado: ' + product.querySelector('h4').innerText);
        });
    });
});

// SCRIPT DE IMAGENES

document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.imagen-fondo img');
    let indice = 0;

    function cambiarImagen() {
        imagenes.forEach(img => img.style.opacity = 0);
        imagenes[indice].style.opacity = 1;
        indice = (indice + 1) % imagenes.length;
    }

    cambiarImagen(); 

    setInterval(cambiarImagen, 5000); // imagen cada 5 segundos
});


// SCRIPT NAV FIJADO

document.addEventListener("DOMContentLoaded", function() {
    var nav = document.querySelector('.navegador');
    var navTop = nav.offsetTop;

    window.addEventListener('scroll', function() {
        if (window.scrollY >= navTop) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
    });
});


// Inicializar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    cart.push(product);
    saveCart();
    updateCartCount();
    displayCartItems(); // Actualizar el carrito inmediatamente después de agregar un producto
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
    updateCartCount();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('cart-item');
            productDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsContainer.appendChild(productDiv);
        });
        const total = calculateTotal();
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total');
        totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        cartItemsContainer.appendChild(totalDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productElement = e.target.closest('.box');
            const product = {
                image: productElement.querySelector('img').src,
                name: productElement.querySelector('h2').textContent,
                price: productElement.querySelector('span').textContent
            };
            addToCart(product);
        });
    });

    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            const cartElement = document.getElementById('cart');
            cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
            displayCartItems();
        });
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = '/finalizar.html';
        });
    }

    const closeCartButton = document.getElementById('close-cart-button');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            const cartElement = document.getElementById('cart');
            cartElement.style.display = 'none';
        });
    }


    updateCartCount();
});

// FINALIZAR COMPRA

function calculateTotal() {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
}

function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');
    if (orderSummaryContainer) {
        orderSummaryContainer.innerHTML = '';
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('order-item');
            productDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            orderSummaryContainer.appendChild(productDiv);
        });
        const total = calculateTotal();
        const tax = total * 0.07;
        const grandTotal = total + tax;
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('order-total');
        totalDiv.innerHTML = `
            <strong>Total: $${total.toFixed(2)}</strong><br>
            <strong>Impuesto (7%): $${tax.toFixed(2)}</strong><br>
            <strong>Total con Impuesto: $${grandTotal.toFixed(2)}</strong>
        `;
        orderSummaryContainer.appendChild(totalDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayOrderSummary();

    const finalizePurchaseButton = document.getElementById('finalize-purchase-button');
    if (finalizePurchaseButton) {
        finalizePurchaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Compra finalizada');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = '/index.html';
        });
    }
});

