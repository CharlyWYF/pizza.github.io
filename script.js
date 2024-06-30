document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.querySelector('.dark-mode-switch');
    darkModeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    const images = document.querySelectorAll('.carousel img');
    const indicators = document.querySelectorAll('.carousel .indicator');
    let currentIndex = 0;

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

        // Add event listeners for the new cart item buttons
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

        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            cartItem.remove();
            updateCart();
        });
    };

    // Update quantity and total calculation
    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', () => {
            const quantityElement = button.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = ++quantity;
            updateCart();
        });
    });

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', () => {
            const quantityElement = button.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantityElement.textContent = --quantity;
                updateCart();
            }
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            cartItem.remove();
            updateCart();
        });
    });

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
});

// 显示弹窗
function showComingSoon() {
    document.getElementById('coming-soon-modal').style.display = 'flex';
}

// 隐藏弹窗
function hideComingSoon() {
    document.getElementById('coming-soon-modal').style.display = 'none';
}

// 点击窗口外部隐藏弹窗
window.onclick = function (event) {
    var modal = document.getElementById('coming-soon-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function showServiceUnavailable() {
    document.getElementById('service-unavailable-modal').style.display = 'flex';
}

function hideServiceUnavailable() {
    document.getElementById('service-unavailable-modal').style.display = 'none';
}

function switchLanguage(language) {
    if (language === 'en') {
        document.documentElement.lang = 'en';
    } else if (language === 'zh') {
        document.documentElement.lang = 'zh';
    }
}
