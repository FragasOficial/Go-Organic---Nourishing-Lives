document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }

    async function loadClientInfo() {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:3000/api/user/profile', {
                headers: {
                    'x-access-token': token
                }
            });
            const userData = await response.json();
            if (response.ok) {
                document.getElementById('userName').textContent = userData.name;
                document.getElementById('clientName').textContent = userData.name;
                document.getElementById('clientEmail').textContent = userData.email;
                document.getElementById('clientPhone').textContent = userData.phone || 'N/A';
                document.getElementById('clientAddress').textContent = `${userData.street || ''}, ${userData.city || ''} - ${userData.state || ''}`;
            } else {
                console.error("Erro ao carregar informações do cliente:", userData.message);
            }
        } catch (error) {
            console.error("Erro de rede ao carregar info do cliente:", error);
        }
    }

    async function loadClientOrders() {
        const ordersContainer = document.getElementById('clientOrders');
        const token = localStorage.getItem('token');
        if (!token) return;

        ordersContainer.innerHTML = '<p class="placeholder-text">Carregando seus pedidos...</p>';

        try {
            const response = await fetch('http://localhost:3000/api/user/orders', {
                headers: {
                    'x-access-token': token
                }
            });
            const orders = await response.json();

            if (response.ok && orders.length > 0) {
                ordersContainer.innerHTML = '';
                orders.forEach(order => {
                    const orderItem = document.createElement('div');
                    orderItem.classList.add('order-item');
                    orderItem.innerHTML = `
                        <div class="order-header">
                            <p class="order-number">Pedido #${order.id}</p>
                            <p class="order-status ${order.status}"><i class="fas fa-truck"></i> ${order.status}</p>
                        </div>
                        <div class="order-body">
                            <p class="order-date">Data do Pedido: ${new Date(order.created_at).toLocaleDateString()}</p>
                            <p class="order-total">Total: R$ ${order.total.toFixed(2)}</p>
                        </div>
                        <button class="btn btn-secondary view-order-btn">Ver Detalhes</button>
                    `;
                    ordersContainer.appendChild(orderItem);
                });
            } else {
                ordersContainer.innerHTML = '<p>Nenhum pedido encontrado.</p>';
            }
        } catch (error) {
            console.error("Erro de rede ao carregar pedidos:", error);
            ordersContainer.innerHTML = '<p>Erro ao carregar pedidos. Tente novamente mais tarde.</p>';
        }
    }

    loadClientInfo();
    loadClientOrders();
});