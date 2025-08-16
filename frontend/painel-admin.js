document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }

    async function loadDashboardStats() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            const response = await fetch('http://localhost:3000/api/admin/stats', {
                headers: {
                    'x-access-token': token
                }
            });
            const stats = await response.json();

            if (response.ok) {
                document.getElementById('totalUsers').textContent = stats.totalUsers;
                document.getElementById('totalSellers').textContent = stats.totalSellers;
                document.getElementById('totalProducts').textContent = stats.totalProducts;
                document.getElementById('totalOrders').textContent = stats.totalOrders;
            }
        } catch (error) {
            console.error('Erro ao carregar estatísticas do dashboard:', error);
        }
    }

    async function loadUserTable() {
        const tableBody = document.querySelector('#userTable tbody');
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:3000/api/admin/users', {
                headers: {
                    'x-access-token': token
                }
            });
            const users = await response.json();

            if (response.ok) {
                tableBody.innerHTML = '';
                users.forEach(user => {
                    const row = tableBody.insertRow();
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.user_type}</td>
                        <td>
                            <button class="action-btn edit-btn" data-id="${user.id}"><i class="fas fa-edit"></i> Editar</button>
                            <button class="action-btn delete-btn" data-id="${user.id}"><i class="fas fa-trash-alt"></i> Excluir</button>
                        </td>
                    `;
                });
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            tableBody.innerHTML = '<tr><td colspan="5">Erro ao carregar usuários.</td></tr>';
        }
    }

    async function loadAdminProducts() {
        const productsContainer = document.getElementById('adminProducts');
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:3000/api/admin/products', {
                headers: {
                    'x-access-token': token
                }
            });
            const products = await response.json();

            if (response.ok) {
                productsContainer.innerHTML = '';
                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');
                    productItem.innerHTML = `
                        <img src="${product.image_url}" alt="${product.name}" class="product-image">
                        <div class="product-details">
                            <h4 class="product-name">${product.name}</h4>
                            <p class="product-seller">Vendedor: ${product.seller_id}</p>
                            <p class="product-status">Status: ${product.status || 'ativo'}</p>
                            <div class="product-actions">
                                <button class="action-btn edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i> Editar</button>
                                <button class="action-btn delete-btn" data-id="${product.id}"><i class="fas fa-trash-alt"></i> Excluir</button>
                            </div>
                        </div>
                    `;
                    productsContainer.appendChild(productItem);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar produtos do admin:', error);
            productsContainer.innerHTML = '<p>Erro ao carregar produtos para gerenciamento.</p>';
        }
    }

    loadDashboardStats();
    loadUserTable();
    loadAdminProducts();
});