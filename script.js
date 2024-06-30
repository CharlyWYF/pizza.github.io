document.addEventListener('DOMContentLoaded', () => {
    // Toggle dark mode
    const darkModeSwitch = document.querySelector('.dark-mode-switch');
    darkModeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.navbar').classList.toggle('dark-mode');
        document.querySelector('.footer').classList.toggle('dark-mode');
        document.querySelector('.menu').classList.toggle('dark-mode');
        document.querySelector('.shopping-cart').classList.toggle('dark-mode');
        document.querySelectorAll('.search-bar').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.language-switch-container').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.language-dropdown a').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.modal-content').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.cart-item').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.product-item').forEach(el => el.classList.toggle('dark-mode'));
        document.querySelectorAll('.menu-title, .product-title, .product-price, .add-button').forEach(el => el.classList.toggle('dark-mode'));
    });

    // Carousel functionality
    const images = document.querySelectorAll('.carousel img');
    const indicators = document.querySelectorAll('.carousel .indicator');
    let currentIndex = 0;

    // Function to show next image in the carousel
    const showNextImage = () => {
        const previousIndex = currentIndex;
        currentIndex = (currentIndex + 1) % images.length;

        images[previousIndex].classList.remove('active');
        images[previousIndex].classList.add('previous');
        indicators[previousIndex].classList.remove('active');

        setTimeout(() => {
            images[previousIndex].classList.remove('previous');
        }, 1000); // Duration must match the CSS transition duration

        images[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    };

    images[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
    setInterval(showNextImage, 3000);

    // Add click event listeners to carousel indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index !== currentIndex) {
                const previousIndex = currentIndex;
                currentIndex = index;

                images[previousIndex].classList.remove('active');
                images[previousIndex].classList.add('previous');
                indicators[previousIndex].classList.remove('active');

                setTimeout(() => {
                    images[previousIndex].classList.remove('previous');
                }, 1000); // Duration must match the CSS transition duration

                images[currentIndex].classList.add('active');
                indicators[currentIndex].classList.add('active');
            }
        });
    });

    // Add to cart functionality
    const cartItemsContainer = document.querySelector('.cart-items');
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const title = productItem.querySelector('.product-title').textContent;
            const price = productItem.querySelector('.product-price').textContent.replace('AED ', '').trim();
            const imgSrc = productItem.querySelector('.product-image').src;
            addItemToCart(title, price, imgSrc);
            updateCart();
        });
    });

    // Function to add an item to the cart
    const addItemToCart = (title, price, imgSrc) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${title}</h3>
                <div class="cart-item-price">AED ${parseFloat(price).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-decrease">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-increase">+</button>
                    <button class="cart-item-remove">x</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Add event listeners for quantity increase and decrease buttons
        cartItem.querySelector('.quantity-increase').addEventListener('click', () => {
            const quantityElement = cartItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = ++quantity;
            updateCart();
        });

        cartItem.querySelector('.quantity-decrease').addEventListener('click', () => {
            const quantityElement = cartItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantityElement.textContent = --quantity;
                updateCart();
            }
        });

        // Add event listener for remove button
        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            cartItem.remove();
            updateCart();
        });
    };

    // Update cart totals and quantities
    const updateCart = () => {
        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent.replace('AED ', '').trim();
            const price = parseFloat(priceText);
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });
        const tax = subtotal * 0.10; // Example tax rate of 10%
        const total = subtotal + tax;
        document.querySelector('.subtotal span:last-child').textContent = `AED ${subtotal.toFixed(2)}`;
        document.querySelector('.tax span:last-child').textContent = `AED ${tax.toFixed(2)}`;
        document.querySelector('.total span:last-child').textContent = `AED ${total.toFixed(2)}`;
        document.querySelector('.cart-count').textContent = `(${document.querySelectorAll('.cart-item').length} items)`;
    };

    updateCart(); // Initial calculation

    // Modal functionality
    window.onclick = function (event) {
        const comingSoonModal = document.getElementById('coming-soon-modal');
        const serviceUnavailableModal = document.getElementById('service-unavailable-modal');
        if (event.target === comingSoonModal) {
            comingSoonModal.style.display = 'none';
        }
        if (event.target === serviceUnavailableModal) {
            serviceUnavailableModal.style.display = 'none';
        }
    };
});

// Function to show "Coming Soon" modal
function showComingSoon() {
    document.getElementById('coming-soon-modal').style.display = 'flex';
}

// Function to hide "Coming Soon" modal
function hideComingSoon() {
    document.getElementById('coming-soon-modal').style.display = 'none';
}

// Function to show "Service Unavailable" modal
function showServiceUnavailable() {
    document.getElementById('service-unavailable-modal').style.display = 'flex';
}

// Function to hide "Service Unavailable" modal
function hideServiceUnavailable() {
    document.getElementById('service-unavailable-modal').style.display = 'none';
}

// Function to switch language
function switchLanguage(language) {
    if (language === 'en') {
        document.documentElement.lang = 'en';
    } else if (language === 'zh') {
        document.documentElement.lang = 'zh';
    }
}
