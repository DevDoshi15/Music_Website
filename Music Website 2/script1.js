// Get cart items from local storage or create empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Get cart total from local storage or set to 0
let cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0;

// Update cart UI
function updateCart() {
  // Clear cart items
  document.getElementById('cart-items').innerHTML = '';

  // Add cart items to UI
  cartItems.forEach(function(item) {
    let li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-from-cart" data-name="${item.name}">Remove</button>`;
    document.getElementById('cart-items').appendChild(li);
  });

  // Update cart total
  document.getElementById('cart-total').innerHTML = cartTotal.toFixed(2);

  // Save cart items and total to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
}

// Add to cart button click event
document.querySelectorAll('.add-to-cart').forEach(function(button) {
  button.addEventListener('click', function() {
    let name = this.getAttribute('data-name');
    let price = parseFloat(this.getAttribute('data-price'));

    // Add item to cart
    cartItems.push({name: name, price: price});

    // Update cart total
    cartTotal += price;

    // Update cart UI
    updateCart();
  });
});

// Remove from cart button click event
document.querySelectorAll('.remove-from-cart').forEach(function(button) {
  button.addEventListener('click', function() {
    let name = this.getAttribute('data-name');

    // Remove item from cart
    cartItems = cartItems.filter(function(item) {return item.name !== name;
    });

    
    // Update cart total
    cartTotal = cartItems.reduce(function(total, item) {
        return total + item.price;
        }, 0);
        // Update cart UI
updateCart();
});
});

// Clear cart button click event
document.getElementById('clear-cart').addEventListener('click', function() {
// Clear cart items
cartItems = [];

// Clear cart total
cartTotal = 0;

// Update cart UI
updateCart();
});