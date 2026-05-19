// Admin JavaScript - Ki Fome Lanches Master-Detail POS Dashboard

let ordersCache = [];
let highestOrderId = 0;
let soundEnabled = false;
let activeFilter = 'Todos';
let searchQuery = '';
let selectedOrderId = null;

document.addEventListener("DOMContentLoaded", () => {
    // Initial fetch of orders
    fetchOrders();

    // Set polling interval for live updates (every 5 seconds for immediate sync)
    setInterval(fetchOrders, 5000);

    // Manual refresh button
    const refreshBtn = document.getElementById('btn-refresh-orders');
    if(refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchOrders();
            showToast('Fila de lanches atualizada!', 'info');
        });
    }

    // Hook up Search Input Filter
    const searchInput = document.getElementById('admin-search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderOrdersList();
        });
    }

    // Hook up Status Filter Tabs
    const filterTabsContainer = document.getElementById('filter-tabs-container');
    if(filterTabsContainer) {
        filterTabsContainer.addEventListener('click', (e) => {
            const tabButton = e.target.closest('.filter-tab');
            if(!tabButton) return;
            
            // Remove active classes
            document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            tabButton.classList.add('active');
            
            // Update filter status and re-render left panel
            activeFilter = tabButton.dataset.filter;
            renderOrdersList();
        });
    }

    // Sound activation trigger on first user click anywhere on screen
    document.body.addEventListener('click', () => {
        if(!soundEnabled) {
            soundEnabled = true;
            console.log("Audio POS notification alerts initialized!");
        }
    }, { once: true });
});

// Fetch all orders from Flask CSV API
async function fetchOrders() {
    try {
        const response = await fetch('/api/orders');
        if(!response.ok) throw new Error("Falha ao se conectar à API");
        
        const orders = await response.json();
        
        // Trigger alert bell if new order arrives
        checkForNewOrders(orders);
        
        ordersCache = orders;
        
        // Recalculate dashboard statistics cards
        updateDashboardStats(orders);
        
        // Render the left master panel list
        renderOrdersList();
        
        // If an order is currently selected, re-render its details dynamically in case status changed
        if(selectedOrderId !== null) {
            renderOrderDetails(selectedOrderId);
        }
        
    } catch (err) {
        console.error("Erro ao carregar fila de pedidos:", err);
        showToast("Sem conexão com o servidor. Tentando reconectar...", "warning");
    }
}

// Play sound on new incoming order
function checkForNewOrders(orders) {
    if(orders.length === 0) return;

    const maxId = Math.max(...orders.map(o => o.id));

    if (highestOrderId === 0) {
        highestOrderId = maxId;
        return;
    }

    if (maxId > highestOrderId) {
        highestOrderId = maxId;
        
        if(soundEnabled) {
            const bell = document.getElementById('bell-sound');
            if(bell) {
                bell.currentTime = 0;
                bell.play().catch(e => console.log("Erro de autoplay do som:", e));
            }
        }
        
        showToast("🍔 NOVO PEDIDO RECEBIDO!", "success");
    }
}

// Compute general statistics cards and filter badges count
function updateDashboardStats(orders) {
    const statsRevenue = document.getElementById('stats-revenue');
    const statsPending = document.getElementById('stats-pending');
    const statsActive = document.getElementById('stats-active');
    const statsCompleted = document.getElementById('stats-completed');

    let revenue = 0;
    let pendingCount = 0;
    let activeCount = 0; // Preparando + A Caminho
    let completedCount = 0;
    let cancelledCount = 0;

    orders.forEach(order => {
        if(order.status === 'Entregue') {
            revenue += order.total;
            completedCount++;
        } else if(order.status === 'Pendente') {
            pendingCount++;
        } else if(['Preparando', 'A Caminho'].includes(order.status)) {
            activeCount++;
        } else if(order.status === 'Cancelado') {
            cancelledCount++;
        }
    });

    if(statsRevenue) statsRevenue.textContent = `R$ ${revenue.toFixed(2).replace('.', ',')}`;
    if(statsPending) statsPending.textContent = pendingCount;
    if(statsActive) statsActive.textContent = activeCount;
    if(statsCompleted) statsCompleted.textContent = completedCount;

    // Update the visual badges inside filter tabs
    const badgePending = document.getElementById('count-badge-pending');
    const badgePreparing = document.getElementById('count-badge-preparing');
    const badgeShipping = document.getElementById('count-badge-shipping');
    const badgeCompleted = document.getElementById('count-badge-completed');
    const badgeCancelled = document.getElementById('count-badge-cancelled');

    const prepCount = orders.filter(o => o.status === 'Preparando').length;
    const shipCount = orders.filter(o => o.status === 'A Caminho').length;

    if(badgePending) badgePending.textContent = pendingCount;
    if(badgePreparing) badgePreparing.textContent = prepCount;
    if(badgeShipping) badgeShipping.textContent = shipCount;
    if(badgeCompleted) badgeCompleted.textContent = completedCount;
    if(badgeCancelled) badgeCancelled.textContent = cancelledCount;
}

// Render Left Panel compact order rows
function renderOrdersList() {
    const listContainer = document.getElementById('admin-orders-list');
    if(!listContainer) return;
    
    listContainer.innerHTML = '';
    
    // Apply filters
    let filteredOrders = [...ordersCache];
    
    // 1. Filter by search query
    if(searchQuery) {
        filteredOrders = filteredOrders.filter(o => 
            o.customer_name.toLowerCase().includes(searchQuery) ||
            o.customer_address.toLowerCase().includes(searchQuery) ||
            o.id.toString() === searchQuery
        );
    }
    
    // 2. Filter by tab status
    if(activeFilter !== 'Todos') {
        filteredOrders = filteredOrders.filter(o => o.status === activeFilter);
    }
    
    // Update main order count badge
    document.getElementById('orders-count-badge').textContent = filteredOrders.length;
    
    if(filteredOrders.length === 0) {
        listContainer.innerHTML = `<div class="empty-list-message">Nenhum pedido correspondente encontrado</div>`;
        return;
    }
    
    // Render compact cards
    filteredOrders.forEach(order => {
        const row = document.createElement('div');
        
        // Define card states classes
        const statusClass = order.status.toLowerCase().replace('a caminho', 'shipping').replace('entregue', 'completed').replace('cancelado', 'cancelled');
        row.className = `compact-order-row ${statusClass}`;
        
        if(selectedOrderId === order.id) {
            row.classList.add('selected');
        }
        
        // Click action: Select this row and load right workspace detail
        row.addEventListener('click', () => {
            // Remove previous selections
            document.querySelectorAll('.compact-order-row').forEach(card => card.classList.remove('selected'));
            // Select current
            row.classList.add('selected');
            selectedOrderId = order.id;
            renderOrderDetails(order.id);
        });
        
        const timeStr = order.created_at ? order.created_at.split(' ')[1] : '--:--';
        
        // Item summary snippet
        let itemsSnippet = order.items;
        if(Array.isArray(order.items)) {
            itemsSnippet = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');
        }
        
        row.innerHTML = `
            <div class="compact-order-row-top">
                <span class="compact-order-id">Pedido #${order.id}</span>
                <span class="compact-order-time"><i class="fa-regular fa-clock"></i> ${timeStr}</span>
            </div>
            <div class="compact-order-row-mid">
                <span class="client-name">${order.customer_name}</span>
            </div>
            <div class="compact-order-row-items" title="${itemsSnippet}">
                ${itemsSnippet}
            </div>
            <div class="compact-order-row-bottom">
                <span class="compact-order-price">R$ ${order.total.toFixed(2).replace('.', ',')}</span>
                <span class="compact-status-badge ${statusClass}">${order.status}</span>
            </div>
        `;
        
        listContainer.appendChild(row);
    });
}

// Render Right Workspace Detail Section
function renderOrderDetails(id) {
    const placeholder = document.getElementById('no-selection-placeholder');
    const workspace = document.getElementById('order-detail-workspace');
    
    const order = ordersCache.find(o => o.id === id);
    
    if(!order) {
        // If selected order was not found (or cleared), fallback to placeholder
        selectedOrderId = null;
        placeholder.classList.remove('hidden');
        workspace.classList.add('hidden');
        return;
    }
    
    // Hide placeholder and reveal desk workspace
    placeholder.classList.add('hidden');
    workspace.classList.remove('hidden');
    
    // Populate header details
    document.getElementById('ws-order-id').textContent = order.id;
    
    const badge = document.getElementById('ws-status-badge');
    badge.textContent = order.status;
    badge.className = 'status-badge'; // reset
    const statusClass = order.status.toLowerCase().replace('a caminho', 'shipping').replace('entregue', 'completed').replace('cancelado', 'cancelled');
    badge.classList.add(statusClass);
    
    // Populate Client Section
    document.getElementById('ws-name').textContent = order.customer_name;
    
    const phoneClean = order.customer_phone.replace(/[^\d]/g, '');
    const phoneFormatted = phoneClean.startsWith('55') ? phoneClean : '55' + phoneClean;
    document.getElementById('ws-phone').innerHTML = `
        <a href="https://api.whatsapp.com/send?phone=${phoneFormatted}" target="_blank" class="text-blue" style="font-weight: 700;">
            <i class="fa-brands fa-whatsapp text-green"></i> ${order.customer_phone} 
            <span style="font-size:0.75rem; font-weight: normal; margin-left:5px;">(Chamar no Whats)</span>
        </a>`;
        
    document.getElementById('ws-address').textContent = order.customer_address;
    document.getElementById('ws-payment').textContent = order.payment_method;
    
    // Troco (Change) Row
    const changeRow = document.getElementById('ws-change-row');
    if(order.payment_method.includes('Dinheiro') && order.change_for) {
        changeRow.style.display = 'block';
        document.getElementById('ws-change').textContent = order.change_for;
    } else {
        changeRow.style.display = 'none';
    }
    
    // Resumo
    document.getElementById('ws-subtotal').textContent = `R$ ${order.subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('ws-delivery').textContent = `R$ ${order.delivery_fee.toFixed(2).replace('.', ',')}`;
    document.getElementById('ws-total').textContent = `R$ ${order.total.toFixed(2).replace('.', ',')}`;
    
    // Render lanches list in desk workspace
    const itemsListEl = document.getElementById('ws-items-list');
    itemsListEl.innerHTML = '';
    
    // Fallback in case items are stored in human-readable CSV string, otherwise JSON parsed list
    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    } catch(e) {
        items = order.items; // Fallback directly to human readable string
    }
    
    if(Array.isArray(items)) {
        items.forEach(item => {
            const li = document.createElement('li');
            
            let adds = '';
            if(item.additions && item.additions.length > 0) {
                adds = `<div class="detail-item-meta"><strong>Adicionais:</strong> ${item.additions.join(', ')}</div>`;
            }

            let obs = '';
            if(item.notes) {
                obs = `<div class="detail-item-notes"><i class="fa-solid fa-comment-dots"></i> Obs: "${item.notes}"</div>`;
            }

            li.innerHTML = `
                <div><strong>${item.qty}x ${item.name}</strong> - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}</div>
                ${adds}
                ${obs}
            `;
            itemsListEl.appendChild(li);
        });
    } else {
        // Human readable CSV string parsed directly
        // Splits items separated by semicolons
        const itemsSplit = items.split(';');
        itemsSplit.forEach(itemStr => {
            if(itemStr.trim()) {
                const li = document.createElement('li');
                li.innerHTML = `<div><strong>${itemStr.trim()}</strong></div>`;
                itemsListEl.appendChild(li);
            }
        });
    }
    
    // Action Desk Buttons
    const footer = document.getElementById('ws-modal-footer');
    footer.innerHTML = '';
    
    if(order.status === 'Pendente') {
        footer.innerHTML = `
            <button class="btn btn-secondary btn-block" onclick="updateOrderStatus(${order.id}, 'Preparando')">
                <i class="fa-solid fa-fire-burner"></i> Aceitar & Iniciar Preparo
            </button>
            <button class="btn btn-sm" style="background-color:#E53935; color: white;" onclick="updateOrderStatus(${order.id}, 'Cancelado')">
                <i class="fa-solid fa-ban"></i> Cancelar Pedido
            </button>
        `;
    } else if(order.status === 'Preparando') {
        footer.innerHTML = `
            <button class="btn btn-secondary btn-block" style="background-color: #AFB42B; border-color: #AFB42B;" onclick="updateOrderStatus(${order.id}, 'A Caminho')">
                <i class="fa-solid fa-motorcycle"></i> Despachar para Entrega
            </button>
            <button class="btn btn-sm" style="background-color:#E53935; color: white;" onclick="updateOrderStatus(${order.id}, 'Cancelado')">
                <i class="fa-solid fa-ban"></i> Cancelar
            </button>
        `;
    } else if(order.status === 'A Caminho') {
        footer.innerHTML = `
            <button class="btn btn-primary btn-block" style="background-color: var(--color-green); box-shadow:none;" onclick="updateOrderStatus(${order.id}, 'Entregue')">
                <i class="fa-solid fa-circle-check"></i> Finalizar & Entregar
            </button>
            <button class="btn btn-sm" style="background-color:#E53935; color: white;" onclick="updateOrderStatus(${order.id}, 'Cancelado')">
                <i class="fa-solid fa-ban"></i> Cancelar
            </button>
        `;
    } else {
        // Entregue or Cancelado
        const color = order.status === 'Entregue' ? 'color: var(--color-green-dark); font-weight:800;' : 'color: #E53935; font-weight:800;';
        const icon = order.status === 'Entregue' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>';
        footer.innerHTML = `<span style="font-size: 1.1rem; text-transform: uppercase; ${color}">${icon} Pedido Finalizado: ${order.status}</span>`;
    }
}

// Action Status Transitions (PUT request API)
window.updateOrderStatus = async function(orderId, newStatus) {
    try {
        const response = await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if(!response.ok) throw new Error("Erro ao atualizar status do pedido no servidor");

        showToast(`Pedido #${orderId} alterado para "${newStatus}"!`, 'success');
        
        // Refresh list
        fetchOrders();
    } catch(err) {
        console.error(err);
        showToast("Erro ao processar alteração de status.", "warning");
    }
};

// Toast Alerts
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
