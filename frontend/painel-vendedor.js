// painel-vendedor.js
document.addEventListener('DOMContentLoaded', () => {
    const safeGetElement = (id) => document.getElementById(id) || null;
    
    // Logout
    safeGetElement('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });

    // Verificar tipo de usuário
    if (localStorage.getItem('user_type') !== 'vendedor') {
        Swal.fire({
            icon: 'error',
            title: 'Acesso Negado',
            text: 'Você não tem permissão para acessar este painel.',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            window.location.href = 'index.html';
        });
        return;
    }

    // Carregar nome do usuário
    const userNameElement = safeGetElement('userName');
    const userName = localStorage.getItem('user_name');
    if (userNameElement && userName) {
        userNameElement.textContent = userName;
    }

    // Formulário de produto
    safeGetElement('productForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire('Erro!', 'Sessão expirada. Faça login novamente.', 'error');
            return;
        }

        const productData = {
            name: safeGetElement('productName').value,
            description: safeGetElement('productDescription').value,
            price: parseFloat(safeGetElement('productPrice').value),
            image: safeGetElement('productImage').value,
            state: safeGetElement('productState').value,
            city: safeGetElement('productCity').value,
            category_id: parseInt(safeGetElement('productCategory').value),
            available_quantity: parseInt(safeGetElement('productQuantity').value),
            unit_of_measure: safeGetElement('productUnit').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire('Sucesso!', 'Produto cadastrado com sucesso.', 'success');
                safeGetElement('productForm').reset();
                loadSellerProducts();
            } else {
                Swal.fire('Erro!', `Falha ao cadastrar: ${result.message}`, 'error');
            }
        } catch (error) {
            Swal.fire('Erro!', 'Não foi possível se conectar ao servidor.', 'error');
        }
    });

    // Carregar produtos
    async function loadSellerProducts() {
        const productsContainer = safeGetElement('myProducts');
        if (!productsContainer) return;

        productsContainer.innerHTML = '<p>Carregando produtos...</p>';

        try {
            const token = localStorage.getItem('token');
            const sellerId = localStorage.getItem('user_id');
            const response = await fetch(`http://localhost:3000/api/products/seller/${sellerId}`, {
                headers: { 'x-access-token': token }
            });
            
            const products = await response.json();

            if (response.ok) {
                productsContainer.innerHTML = '';
                if (products.length === 0) {
                    productsContainer.innerHTML = '<p>Nenhum produto cadastrado</p>';
                    return;
                }
                
                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');
                    productItem.innerHTML = `
                        <div class="product-image-container">
                            <img src="${product.image_url}" alt="${product.name}" class="product-image">
                        </div>
                        <div class="product-details">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <p class="product-price">R$ ${product.price.toFixed(2)}/${product.unit_of_measure}</p>
                            <p class="product-quantity">Disponível: ${product.available_quantity}</p>
                            <div class="product-actions">
                                <button class="action-btn edit-btn" data-id="${product.id}">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="action-btn delete-btn" data-id="${product.id}">
                                    <i class="fas fa-trash-alt"></i> Excluir
                                </button>
                            </div>
                        </div>
                    `;
                    productsContainer.appendChild(productItem);
                });
                setupProductActions();
            }
        } catch (error) {
            productsContainer.innerHTML = '<p>Erro ao carregar produtos</p>';
        }
    }

    // Ações de produto
    function setupProductActions() {
        safeGetElement('myProducts')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.action-btn');
            if (!btn) return;
            
            const productId = btn.dataset.id;
            if (btn.classList.contains('delete-btn')) {
                Swal.fire({
                    title: 'Confirmar exclusão?',
                    text: "Esta ação não pode ser revertida!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sim, excluir!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Lógica de exclusão
                        Swal.fire('Excluído!', 'Produto removido com sucesso.', 'success');
                        loadSellerProducts();
                    }
                });
            }
        });
    }

    // Inicialização
    loadSellerProducts();
});