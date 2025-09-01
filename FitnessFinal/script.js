function shopNow() {
    alert("Shop Now button clicked!");
}

// Shopping Cart Logic
let cart = [];

// Function to add item to cart
function addToCart(product, price) {
    // Price is already parsed as float before calling this function
    const item = cart.find(i => i.product === product);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    updateCartFlyout(); // Update the cart display in the flyout menu
    updateCartCount();
}

// Function to update the cart display in the flyout menu
function updateCartFlyout() {
    const cartItemsFlyout = document.getElementById('cart-items-flyout');
    const cartTotalFlyout = document.getElementById('cart-total-flyout');
    cartItemsFlyout.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartItemsFlyout.innerHTML += `
            <div class="cart-item">
                <span>${item.product} (x${item.quantity})</span>
                <span>₹${itemTotal.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromCart('${item.product}')">Remove</button>
            </div>`;
        total += itemTotal;
    });

    cartTotalFlyout.textContent = total.toFixed(2);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to remove item from cart
function removeFromCart(product) {
    const index = cart.findIndex(item => item.product === product);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartFlyout(); // Update the flyout cart display
        updateCartCount();
    }
}

// Add to Cart button functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productName = product.querySelector('h3').textContent;
        let productPrice = product.querySelector('.price').textContent;

        // Remove ₹ symbol and any commas before parsing
        productPrice = parseFloat(productPrice.replace(/[₹,]/g, '')); 

        addToCart(productName, productPrice);
    });
});

// Floating Cart Button functionality
const floatingCartBtn = document.querySelector('.floating-btn');
const cartFlyout = document.getElementById('cart-flyout');

floatingCartBtn.addEventListener('click', () => {
    cartFlyout.classList.toggle('flyout-open');
});

// Close Cart Flyout
document.getElementById('close-cart-flyout').addEventListener('click', () => {
    cartFlyout.classList.remove('flyout-open');
});

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase! Your order has been placed.');
        cart = [];
        updateCartFlyout(); // Update the cart display in the flyout menu
        updateCartCount();
        cartFlyout.classList.remove('flyout-open');
    } else {
        alert('Your cart is empty. Add some items before checking out.');
    }
});

// Function for workout plan buttons
document.querySelectorAll('.btn-plan').forEach(button => {
    button.addEventListener('click', function() {
        alert('Redirecting to workout plan page!');
        // You can add actual redirection logic here
    });
});

// Form handling for contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us!');
});

// Initialize cart count and flyout cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartFlyout();
});

// Flyout Menu Logic
const flyout = document.getElementById('product-flyout');
const flyoutName = document.getElementById('flyout-product-name');
const flyoutDescription = document.getElementById('flyout-product-description');
const flyoutPrice = document.getElementById('flyout-product-price');
const flyoutAddToCart = document.getElementById('flyout-add-to-cart');

// Open Flyout with product details
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.getAttribute('data-product');
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const productDescription = product.getAttribute('data-description');

        // Update flyout content
        flyoutName.textContent = productName;
        flyoutDescription.textContent = productDescription;
        flyoutPrice.textContent = `$${productPrice.toFixed(2)}`;

        // Update Add to Cart functionality
        flyoutAddToCart.onclick = () => {
            addToCart(productName, productPrice);
            closeFlyout();
        };

        // Open flyout
        flyout.classList.add('flyout-open');
    });
});

// Close Flyout
document.getElementById('close-flyout').addEventListener('click', closeFlyout);

function closeFlyout() {
    flyout.classList.remove('flyout-open');
}

// Modal Logic for Checkout
const modal = document.getElementById('checkout-modal');
const openModalBtn = document.getElementById('checkout');
const closeModalBtn = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-content');

// Open the modal when "Checkout" button is clicked
openModalBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        let modalCartItems = '';
        let modalTotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            modalCartItems += `<p>${item.product} (x${item.quantity}): $${itemTotal}</p>`;
            modalTotal += itemTotal;
        });
        modalContent.innerHTML = `
            <h2>Checkout Summary</h2>
            ${modalCartItems}
            <p>Total: $${modalTotal.toFixed(2)}</p>
            <button id="confirm-checkout">Confirm Purchase</button>
            <button class="close-modal" id="close-modal">Close</button>
        `;
        modal.style.display = 'block';
    }
});

// Close modal 
modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.id === 'close-modal') {
        modal.style.display = 'none';
    }
});