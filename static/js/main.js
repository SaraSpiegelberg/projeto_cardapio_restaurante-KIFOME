// Client JavaScript - Ki Fome Lanches

// Food Catalog Menu
const MENU_ITEMS = [
    // Xis
    {
        id: 1,
        category: 'xis',
        name: 'Xis Salada',
        description: 'Pão de xis prensado, hambúrguer caseiro, alface, tomate, milho, ervilha, queijo mussarela derretido e maionese.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 2,
        category: 'xis',
        name: 'Xis Bacon',
        description: 'Pão de xis prensado, hambúrguer caseiro, tiras de bacon super crocantes, alface, tomate, milho, ervilha, queijo e maionese caseira.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 3,
        category: 'xis',
        name: 'Xis Tudo',
        description: 'Pão de xis prensado gigante, hambúrguer, calabresa, bacon crocante, ovo, alface, tomate, milho, ervilha, queijo duplo e maionese.',
        price: 29.90,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 4,
        category: 'xis',
        name: 'Xis Frango',
        description: 'Pão de xis prensado, filé de frango picado bem temperado na chapa, alface, tomate, milho, ervilha, queijo e maionese.',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 5,
        category: 'xis',
        name: 'Xis Coração',
        description: 'Pão de xis prensado, coração de frango grelhado e acebolado, alface, tomate, milho, ervilha, queijo derretido e maionese caseira.',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=600&auto=format&fit=crop'
    },
    
    // Cachorro Quente
    {
        id: 6,
        category: 'dog',
        name: 'Cachorro Quente Simples',
        description: 'Pão de dog prensado, 1 salsicha de primeira, molho especial com tomate, milho, ervilha, batata palha crocante, queijo ralado e maionese.',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 7,
        category: 'dog',
        name: 'Cachorro Quente Duplo',
        description: 'Pão de dog prensado, 2 salsichas, molho especial, milho, ervilha, batata palha, queijo duplo derretido na chapa e maionese da casa.',
        price: 17.00,
        image: 'https://images.unsplash.com/photo-1627059310624-5d957e7c928e?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 8,
        category: 'dog',
        name: 'Cachorro Quente Especial',
        description: 'Pão de dog prensado, 2 salsichas, calabresa picada na chapa, molho artesanal, milho, ervilha, batata palha, queijo derretido e maionese caseira.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1541232972175-1678fa28f0ede?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 9,
        category: 'dog',
        name: 'Cachorro Quente de Bacon',
        description: 'Pão de dog prensado, 2 salsichas, bacon crocante em cubos, molho especial, batata palha, queijo derretido e maionese caseira.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop'
    },

    // Torrada
    {
        id: 10,
        category: 'torrada',
        name: 'Torrada Simples',
        description: 'Pão de torrada especial de padaria, presunto premium, queijo mussarela derretido e maionese prensados com bastante manteiga na chapa.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 11,
        category: 'torrada',
        name: 'Torrada Especial da Casa',
        description: 'Pão de torrada, presunto, queijo derretido, ovo frito de gema mole/firme, tomate fatiado e maionese caseira prensados.',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=600&auto=format&fit=crop'
    },

    // Pastel
    {
        id: 12,
        category: 'pastel',
        name: 'Pastel de Carne Suculento',
        description: 'Massa super crocante frita na hora, recheada com carne moída selecionada, temperos verdes e azeitonas picadas.',
        price: 10.00,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 13,
        category: 'pastel',
        name: 'Pastel de Queijo Cremoso',
        description: 'Pastel frito na hora com recheio abundante de queijo mussarela de altíssima qualidade derretido e orégano.',
        price: 10.00,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 14,
        category: 'pastel',
        name: 'Pastel Frango com Catupiry',
        description: 'Massa crocante frita na hora, recheada com frango cozido e desfiado temperado com alho e cebola e queijo tipo Catupiry original.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 15,
        category: 'pastel',
        name: 'Pastel Doce de Chocolate',
        description: 'Pastel doce crocante recheado com chocolate ao leite cremoso derretido e granulado de chocolate.',
        price: 13.00,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
    },

    // Bebidas
    {
        id: 16,
        category: 'bebidas',
        name: 'Coca-Cola Lata 350ml',
        description: 'Lata de refrigerante Coca-Cola original gelada perfeita para acompanhar seu lanche.',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 17,
        category: 'bebidas',
        name: 'Guaraná Antarctica 350ml',
        description: 'Lata de refrigerante Guaraná Antarctica original trincando de gelada.',
        price: 5.00,
        image: 'https://images.unsplash.com/photo-1567103472667-6898f3a83cd2?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 18,
        category: 'bebidas',
        name: 'Coca-Cola 2 Litros',
        description: 'Garrafa de refrigerante Coca-Cola tamanho família gelada ideal para compartilhar.',
        price: 11.00,
        image: 'https://images.unsplash.com/photo-1605270012917-bf15775a9541?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 19,
        category: 'bebidas',
        name: 'Suco de Laranja Natural 400ml',
        description: 'Copo de suco puro de laranja espremido na hora com gelo, sem conservantes.',
        price: 8.00,
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 20,
        category: 'bebidas',
        name: 'Água Mineral sem Gás 500ml',
        description: 'Garrafa de água mineral gelada da fonte sem gás.',
        price: 4.00,
        image: 'https://images.unsplash.com/photo-1608885898957-a599fb18ec3f?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: 21,
        category: 'bebidas',
        name: 'Heineken Long Neck 330ml',
        description: 'Cerveja Heineken Puro Malte long neck bem gelada (proibida venda para menores de 18 anos).',
        price: 9.00,
        image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=600&auto=format&fit=crop'
    }
];

// Delivery configuration
const DELIVERY_FEE = 5.00;
const WHATSAPP_CONTACT = "5551999999999"; // Example store phone number

// System States
let cart = [];
let currentItemCustomizing = null;
let customQty = 1;

// Document Ready
document.addEventListener("DOMContentLoaded", () => {
    renderMenu('all');
    setupEventListeners();
    updateCartDisplay();
    
    // Inject fallback dynamic food banner placeholders in case images do not load
    const bannerImg = document.getElementById('about-banner-img');
    if(bannerImg) {
        bannerImg.onerror = () => {
            bannerImg.src = "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=1000";
        };
    }
});

// Setup DOM Event Listeners
function setupEventListeners() {
    // Category tabs filter
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            const clickedTab = e.currentTarget;
            clickedTab.classList.add('active');
            
            const category = clickedTab.getAttribute('data-category');
            renderMenu(category);
        });
    });

    // Cart Sidebar togglers
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');

    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    };

    if(openCartBtn) openCartBtn.addEventListener('click', toggleCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Customization Modal controls
    const closeModalBtn = document.getElementById('close-modal-btn');
    const customModal = document.getElementById('custom-modal');
    
    const closeModal = () => {
        customModal.classList.remove('open');
    };
    
    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Quantity Selectors inside Customize Modal
    const qtyMinus = document.getElementById('modal-qty-minus');
    const qtyPlus = document.getElementById('modal-qty-plus');
    const qtyNumber = document.getElementById('modal-qty-number');

    qtyMinus.addEventListener('click', () => {
        if(customQty > 1) {
            customQty--;
            qtyNumber.textContent = customQty;
            updateModalTotalPrice();
        }
    });

    qtyPlus.addEventListener('click', () => {
        customQty++;
        qtyNumber.textContent = customQty;
        updateModalTotalPrice();
    });

    // Handle checkboxes change on Customize Modal
    const checkboxes = document.querySelectorAll('.additional-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateModalTotalPrice);
    });

    // Add Customize Item to Cart Button
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    modalAddToCartBtn.addEventListener('click', addCustomItemToCart);

    // Proceed to Checkout button in Cart Sidebar
    const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');

    proceedCheckoutBtn.addEventListener('click', () => {
        if(cart.length === 0) return;
        toggleCart(); // Close Cart
        checkoutModal.classList.add('open');
        updateCheckoutModalPrice();
    });

    if(closeCheckoutModal) closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.classList.remove('open');
    });

    // Show/Hide Cash change field
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const changeGroup = document.getElementById('change-group');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(e.target.value === 'Dinheiro') {
                changeGroup.style.display = 'block';
            } else {
                changeGroup.style.display = 'none';
            }
        });
    });

    // Checkout Form Submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}

// Render products dynamically
function renderMenu(category) {
    const grid = document.getElementById('menu-items-grid');
    if(!grid) return;
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? MENU_ITEMS 
        : MENU_ITEMS.filter(item => item.category === category);

    if(filtered.length === 0) {
        grid.innerHTML = `<div class="empty-list-message">Nenhum item encontrado nesta categoria.</div>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-card-img-container">
                <span class="menu-card-tag">${item.category}</span>
                <img src="${item.image}" alt="${item.name}" class="menu-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600'">
            </div>
            <div class="menu-card-body">
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-desc">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <button class="add-to-cart-card-btn" onclick="openCustomizeModal(${item.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Open Item Customize Modal
window.openCustomizeModal = function(id) {
    const item = MENU_ITEMS.find(i => i.id === id);
    if(!item) return;

    currentItemCustomizing = item;
    customQty = 1;
    
    // Set text elements
    document.getElementById('modal-item-title').textContent = item.name;
    document.getElementById('modal-item-desc').textContent = item.description;
    document.getElementById('modal-item-price').textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
    
    const imgEl = document.getElementById('modal-item-img');
    imgEl.src = item.image;
    imgEl.onerror = () => { imgEl.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600'; };

    // Reset quantity
    document.getElementById('modal-qty-number').textContent = customQty;

    // Reset notes
    document.getElementById('custom-notes').value = '';

    // Show/Hide additionals based on category (Only for Xis, Hotdog and Torrada)
    const additionalsGroup = document.getElementById('additionals-group');
    const isLanche = ['xis', 'dog', 'torrada'].includes(item.category);
    
    if(isLanche) {
        additionalsGroup.style.display = 'block';
    } else {
        additionalsGroup.style.display = 'none';
    }

    // Uncheck all additions
    const checkboxes = document.querySelectorAll('.additional-checkbox');
    checkboxes.forEach(cb => cb.checked = false);

    // Calculate total price
    updateModalTotalPrice();

    // Show modal
    document.getElementById('custom-modal').classList.add('open');
};

// Calculate and update modal single item cumulative price
function updateModalTotalPrice() {
    if(!currentItemCustomizing) return;

    let basePrice = currentItemCustomizing.price;
    let additionsPrice = 0;

    // Sum checkboxes if visible
    const isLanche = ['xis', 'dog', 'torrada'].includes(currentItemCustomizing.category);
    if(isLanche) {
        const checkboxes = document.querySelectorAll('.additional-checkbox');
        checkboxes.forEach(cb => {
            if(cb.checked) {
                additionsPrice += parseFloat(cb.getAttribute('data-price'));
            }
        });
    }

    const singleItemTotal = basePrice + additionsPrice;
    const finalTotal = singleItemTotal * customQty;

    document.getElementById('modal-total-price').textContent = finalTotal.toFixed(2).replace('.', ',');
}

// Add Item to Shopping Cart Array
function addCustomItemToCart() {
    if(!currentItemCustomizing) return;

    const basePrice = currentItemCustomizing.price;
    let additions = [];
    let additionsCost = 0;

    const isLanche = ['xis', 'dog', 'torrada'].includes(currentItemCustomizing.category);
    if(isLanche) {
        const checkboxes = document.querySelectorAll('.additional-checkbox');
        checkboxes.forEach(cb => {
            if(cb.checked) {
                additions.push({
                    name: cb.getAttribute('data-name'),
                    price: parseFloat(cb.getAttribute('data-price'))
                });
                additionsCost += parseFloat(cb.getAttribute('data-price'));
            }
        });
    }

    const notes = document.getElementById('custom-notes').value.trim();
    const singlePrice = basePrice + additionsCost;

    // Check if exactly same item with same additions and notes already in cart to group them
    const existingIndex = cart.findIndex(cartItem => {
        if(cartItem.id !== currentItemCustomizing.id) return false;
        if(cartItem.notes !== notes) return false;
        if(cartItem.additions.length !== additions.length) return false;
        
        // Match additions names
        const namesA = cartItem.additions.map(a => a.name).sort();
        const namesB = additions.map(a => a.name).sort();
        return JSON.stringify(namesA) === JSON.stringify(namesB);
    });

    if(existingIndex > -1) {
        cart[existingIndex].qty += customQty;
    } else {
        cart.push({
            cartId: Date.now() + Math.random().toString(36).substr(2, 9), // Unique ID in cart
            id: currentItemCustomizing.id,
            name: currentItemCustomizing.name,
            image: currentItemCustomizing.image,
            category: currentItemCustomizing.category,
            singlePrice: singlePrice,
            qty: customQty,
            additions: additions,
            notes: notes
        });
    }

    // Reset & close
    document.getElementById('custom-modal').classList.remove('open');
    currentItemCustomizing = null;

    updateCartDisplay();
    showToast(`${customQty}x adicionado ao carrinho!`, 'success');
}

// Update Cart Sidebar UI
function updateCartDisplay() {
    const itemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
    
    if(!itemsContainer) return;
    
    // Update badge count
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.textContent = totalQty;

    if(cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-plus"></i>
                <p>Seu carrinho está vazio.</p>
                <p class="small">Que tal adicionar um Xis Tudo bem caprichado?</p>
            </div>
        `;
        proceedCheckoutBtn.disabled = true;
        
        document.getElementById('cart-subtotal').textContent = "R$ 0,00";
        document.getElementById('cart-total').textContent = "R$ 0,00";
        return;
    }

    proceedCheckoutBtn.disabled = false;
    itemsContainer.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.singlePrice * item.qty;
        subtotal += itemTotal;

        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        
        let additionsHtml = '';
        if(item.additions && item.additions.length > 0) {
            additionsHtml = `<div class="cart-item-customizations">Adicionais: ${item.additions.map(a => a.name).join(', ')}</div>`;
        }

        let notesHtml = '';
        if(item.notes) {
            notesHtml = `<div class="cart-item-notes"><i class="fa-solid fa-comment-dots"></i> Obs: "${item.notes}"</div>`;
        }

        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600'">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                ${additionsHtml}
                ${notesHtml}
                <span class="cart-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                <div class="cart-item-actions">
                    <div class="cart-qty-selector">
                        <button class="cart-qty-btn" onclick="updateCartItemQty('${item.cartId}', -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="cart-qty-num">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="updateCartItemQty('${item.cartId}', 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <button class="cart-item-remove-btn" onclick="removeCartItem('${item.cartId}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `;
        itemsContainer.appendChild(cartItemEl);
    });

    const finalTotal = subtotal + DELIVERY_FEE;

    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('cart-delivery').textContent = `R$ ${DELIVERY_FEE.toFixed(2).replace('.', ',')}`;
    document.getElementById('cart-total').textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
}

// Modify cart item quantity
window.updateCartItemQty = function(cartId, delta) {
    const itemIndex = cart.findIndex(i => i.cartId === cartId);
    if(itemIndex > -1) {
        cart[itemIndex].qty += delta;
        if(cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
            showToast("Item removido do carrinho", "info");
        }
        updateCartDisplay();
    }
};

// Remove single cart item completely
window.removeCartItem = function(cartId) {
    const itemIndex = cart.findIndex(i => i.cartId === cartId);
    if(itemIndex > -1) {
        cart.splice(itemIndex, 1);
        showToast("Item removido do carrinho", "info");
        updateCartDisplay();
    }
};

// Update pricing details inside Checkout Modal
function updateCheckoutModalPrice() {
    let subtotal = cart.reduce((acc, item) => acc + (item.singlePrice * item.qty), 0);
    let total = subtotal + DELIVERY_FEE;

    const priceText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    document.getElementById('checkout-total-price').textContent = priceText;
}

// Checkout Submit Order
async function handleCheckoutSubmit(e) {
    e.preventDefault();

    const clientName = document.getElementById('client-name').value.trim();
    const clientPhone = document.getElementById('client-phone').value.trim();
    const clientAddress = document.getElementById('client-address').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const changeFor = document.getElementById('client-change').value.trim();

    if(!clientName || !clientPhone || !clientAddress) {
        showToast("Por favor, preencha todos os campos obrigatórios!", "warning");
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.singlePrice * item.qty), 0);
    const total = subtotal + DELIVERY_FEE;

    // Structured items for backend DB
    const itemsFormatted = cart.map(item => {
        return {
            id: item.id,
            name: item.name,
            qty: item.qty,
            singlePrice: item.singlePrice,
            totalPrice: item.singlePrice * item.qty,
            additions: item.additions.map(a => a.name),
            notes: item.notes
        };
    });

    const payload = {
        customer_name: clientName,
        customer_phone: clientPhone,
        customer_address: clientAddress,
        payment_method: paymentMethod,
        change_for: paymentMethod === 'Dinheiro' && changeFor ? changeFor : null,
        items: itemsFormatted,
        subtotal: subtotal,
        delivery_fee: DELIVERY_FEE,
        total: total
    };

    const submitBtn = document.getElementById('submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registrando Pedido...`;

    try {
        // 1. Submit order to Python SQLite Database API
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok) {
            throw new Error("Erro ao registrar pedido no servidor");
        }

        const resData = await response.json();
        const orderId = resData.order_id || "TEMP";

        showToast("Pedido salvo com sucesso no banco de dados!", "success");

        // 2. Format beautiful message and redirect to WhatsApp API
        const messageText = formatWhatsAppMessage(orderId, clientName, clientPhone, clientAddress, paymentMethod, changeFor, subtotal, total);
        const encodedText = encodeURIComponent(messageText);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONTACT}&text=${encodedText}`;

        // Reset system cart state
        cart = [];
        updateCartDisplay();
        document.getElementById('checkout-modal').classList.remove('open');
        checkoutForm.reset();
        document.getElementById('change-group').style.display = 'block'; // reset defaults

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

    } catch (err) {
        console.error(err);
        
        let orderId = "TEMP";
        try {
            // Save to localStorage for static hosting environments
            let orders = JSON.parse(localStorage.getItem('kifome_orders') || '[]');
            orderId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
            
            // Format order items for human-readable preview in compact row
            const itemsString = cart.map(item => {
                let addsStr = item.additions.length > 0 ? ` (Adicionais: ${item.additions.map(a => a.name).join(', ')})` : '';
                let obsStr = item.notes ? ` | Obs: "${item.notes}"` : '';
                return `${item.qty}x ${item.name}${addsStr}${obsStr}`;
            }).join('; ');

            const newOrder = {
                id: orderId,
                customer_name: clientName,
                customer_phone: clientPhone,
                customer_address: clientAddress,
                payment_method: paymentMethod,
                change_for: paymentMethod === 'Dinheiro' && changeFor ? changeFor : null,
                items: itemsString,
                subtotal: subtotal,
                delivery_fee: DELIVERY_FEE,
                total: total,
                status: "🔴 Pendente",
                created_at: new Date().toLocaleString('sv-SE').substring(0, 19)
            };
            
            orders.push(newOrder);
            localStorage.setItem('kifome_orders', JSON.stringify(orders));
            showToast("Modo Demonstração: Pedido salvo no LocalStorage do navegador!", "success");
        } catch (storageErr) {
            console.error("Falha ao salvar no LocalStorage:", storageErr);
            showToast("Enviando pedido direto via WhatsApp...", "warning");
        }

        // Failover - send WhatsApp even if backend is offline
        const messageText = formatWhatsAppMessage(orderId, clientName, clientPhone, clientAddress, paymentMethod, changeFor, subtotal, total);
        const encodedText = encodeURIComponent(messageText);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONTACT}&text=${encodedText}`;
        
        cart = [];
        updateCartDisplay();
        document.getElementById('checkout-modal').classList.remove('open');
        checkoutForm.reset();

        window.open(whatsappUrl, '_blank');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Enviar Pedido via WhatsApp`;
    }
}

// Generate stylized Text for WhatsApp dispatch
function formatWhatsAppMessage(orderId, name, phone, address, payment, change, subtotal, total) {
    let msg = `*🍔 NOVO PEDIDO - KI FOME! 🌭*\n`;
    msg += `------------------------------------------\n`;
    msg += `*Pedido Nº:* #${orderId}\n`;
    msg += `*Cliente:* ${name}\n`;
    msg += `*Telefone:* ${phone}\n`;
    msg += `*Endereço:* ${address}\n\n`;
    
    msg += `*🛒 ITENS DO PEDIDO:*\n`;
    
    cart.forEach(item => {
        const itemTotal = item.singlePrice * item.qty;
        msg += `- *${item.qty}x ${item.name}* (R$ ${itemTotal.toFixed(2).replace('.', ',')})\n`;
        if(item.additions && item.additions.length > 0) {
            msg += `  _Adicionais: ${item.additions.map(a => a.name).join(', ')}_\n`;
        }
        if(item.notes) {
            msg += `  _Obs: "${item.notes}"_\n`;
        }
    });

    msg += `\n`;
    msg += `------------------------------------------\n`;
    msg += `*Resumo de Valores:*\n`;
    msg += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    msg += `Taxa de Entrega: R$ ${DELIVERY_FEE.toFixed(2).replace('.', ',')}\n`;
    msg += `*TOTAL A PAGAR: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    
    msg += `*💳 Forma de Pagamento:* ${payment}\n`;
    if(payment === 'Dinheiro' && change) {
        msg += `*Troco para:* R$ ${parseFloat(change.replace(/[^\d,]/g, '').replace(',', '.')).toFixed(2).replace('.', ',') || change}\n`;
    }
    msg += `------------------------------------------\n`;
    msg += `_Site criado para o Ki Fome Lanches!_`;

    return msg;
}

// Toast notification trigger
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if(!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '<i class="fa-solid fa-circle-info"></i>';
    if(type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
    if(type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Auto remove after 3.5s
    setTimeout(() => {
        toast.style.animation = 'none';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if(toast.parentNode === container) {
                container.removeChild(toast);
            }
        }, 500);
    }, 3500);
}
