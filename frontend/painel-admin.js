// ========= Visualização Detalhada =========
async function viewClientOrders(clientId) {
    const modal = document.getElementById('clientDetailsModal');
    const list = document.getElementById('clientOrdersList');
    modal.style.display = 'block';
    list.innerHTML = '<p>Carregando pedidos...</p>';

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/admin/clients/${clientId}/orders`, {
            headers: { 'x-access-token': token }
        });
        const orders = await response.json();

        if (response.ok) {
            if (orders.length === 0) {
                list.innerHTML = '<p>Nenhum pedido encontrado.</p>';
            } else {
                list.innerHTML = '';
                orders.forEach(order => {
                    const div = document.createElement('div');
                    div.classList.add('order-item');
                    div.innerHTML = `
                        <p><strong>Pedido #${order.id}</strong> - ${new Date(order.created_at).toLocaleDateString()}</p>
                        <label>Status:
                            <select data-id="${order.id}" class="order-status">
                                <option value="pendente" ${order.status === "pendente" ? "selected" : ""}>Pendente</option>
                                <option value="em andamento" ${order.status === "em andamento" ? "selected" : ""}>Em andamento</option>
                                <option value="entregue" ${order.status === "entregue" ? "selected" : ""}>Entregue</option>
                                <option value="cancelado" ${order.status === "cancelado" ? "selected" : ""}>Cancelado</option>
                            </select>
                        </label>
                        <p>Total: R$ ${order.total.toFixed(2)}</p>
                        <button class="action-btn save-btn" data-id="${order.id}" data-type="order"><i class="fas fa-save"></i> Salvar</button>
                        <button class="action-btn delete-btn" data-id="${order.id}" data-type="order"><i class="fas fa-trash-alt"></i> Cancelar Pedido</button>
                        <hr>
                    `;
                    list.appendChild(div);
                });
            }
        }
    } catch (err) {
        list.innerHTML = '<p>Erro ao carregar pedidos.</p>';
    }
}

async function viewSellerProducts(sellerId) {
    const modal = document.getElementById('sellerDetailsModal');
    const list = document.getElementById('sellerProductsList');
    modal.style.display = 'block';
    list.innerHTML = '<p>Carregando produtos...</p>';

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/admin/sellers/${sellerId}/products`, {
            headers: { 'x-access-token': token }
        });
        const products = await response.json();

        if (response.ok) {
            if (products.length === 0) {
                list.innerHTML = '<p>Nenhum produto encontrado.</p>';
            } else {
                list.innerHTML = '';
                products.forEach(prod => {
                    const div = document.createElement('div');
                    div.classList.add('product-item');
                    div.innerHTML = `
                        <label>Nome: <input type="text" class="prod-name" data-id="${prod.id}" value="${prod.name}"></label>
                        <label>Preço: <input type="number" step="0.01" class="prod-price" data-id="${prod.id}" value="${prod.price}"></label>
                        <label>Quantidade: <input type="number" class="prod-qty" data-id="${prod.id}" value="${prod.available_quantity}"></label>
                        <button class="action-btn save-btn" data-id="${prod.id}" data-type="product"><i class="fas fa-save"></i> Salvar</button>
                        <button class="action-btn delete-btn" data-id="${prod.id}" data-type="product"><i class="fas fa-trash-alt"></i> Excluir Produto</button>
                        <hr>
                    `;
                    list.appendChild(div);
                });
            }
        }
    } catch (err) {
        list.innerHTML = '<p>Erro ao carregar produtos.</p>';
    }
}

// ========= Eventos Globais =========
document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = btn.dataset.id;
    const type = btn.dataset.type;

    // Visualizações
    if (btn.classList.contains('view-btn')) {
        if (type === "client") viewClientOrders(id);
        if (type === "seller") viewSellerProducts(id);
    }

    // Exclusões
    if (btn.classList.contains('delete-btn')) {
        let url = "";
        if (type === "client") url = `http://localhost:3000/api/admin/clients/${id}`;
        if (type === "seller") url = `http://localhost:3000/api/admin/sellers/${id}`;
        if (type === "order") url = `http://localhost:3000/api/admin/orders/${id}`;
        if (type === "product") url = `http://localhost:3000/api/admin/products/${id}`;

        if (!url) return;

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Essa ação não pode ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const resp = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'x-access-token': token }
                });
                if (resp.ok) {
                    Swal.fire('Sucesso!', 'Item excluído com sucesso.', 'success');
                    loadClients();
                    loadSellers();
                    loadAdminProducts();
                    loadUserTable();
                } else {
                    Swal.fire('Erro!', 'Não foi possível excluir.', 'error');
                }
            } catch (err) {
                Swal.fire('Erro!', 'Falha na comunicação com servidor.', 'error');
            }
        }
    }

    // Edições (salvar alterações)
    if (btn.classList.contains('save-btn')) {
        let url = "";
        let body = {};

        if (type === "order") {
            url = `http://localhost:3000/api/admin/orders/${id}`;
            const statusSelect = document.querySelector(`.order-status[data-id="${id}"]`);
            body = { status: statusSelect.value };
        }

        if (type === "product") {
            url = `http://localhost:3000/api/admin/products/${id}`;
            const name = document.querySelector(`.prod-name[data-id="${id}"]`).value;
            const price = parseFloat(document.querySelector(`.prod-price[data-id="${id}"]`).value);
            const qty = parseInt(document.querySelector(`.prod-qty[data-id="${id}"]`).value);
            body = { name, price, available_quantity: qty };
        }

        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(url, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(body)
            });

            if (resp.ok) {
                Swal.fire('Sucesso!', 'Alterações salvas com sucesso.', 'success');
                loadClients();
                loadSellers();
                loadAdminProducts();
            } else {
                Swal.fire('Erro!', 'Não foi possível salvar.', 'error');
            }
        } catch (err) {
            Swal.fire('Erro!', 'Falha na comunicação com servidor.', 'error');
        }
    }
});
