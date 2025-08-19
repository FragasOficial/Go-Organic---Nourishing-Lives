// script.js
document.addEventListener('DOMContentLoaded', () => {
    setupUIListeners();
    displayProducts();
});

function safeGetElement(id) {
    return document.getElementById(id) || null;
}

function setupUIListeners() {
    // Abrir modais
    safeGetElement('loginBtn')?.addEventListener('click', () => {
        safeGetElement('loginModal').style.display = 'block';
    });
    
    safeGetElement('registerBtn')?.addEventListener('click', () => {
        safeGetElement('registerModal').style.display = 'block';
    });
    
    safeGetElement('switchToRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        safeGetElement('loginModal').style.display = 'none';
        safeGetElement('registerModal').style.display = 'block';
    });
    
    safeGetElement('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        safeGetElement('registerModal').style.display = 'none';
        safeGetElement('loginModal').style.display = 'block';
    });

    // Fechar modais
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Botões mobile
    safeGetElement('mobileLoginBtn')?.addEventListener('click', () => {
        safeGetElement('loginModal').style.display = 'block';
    });
    
    safeGetElement('mobileRegisterBtn')?.addEventListener('click', () => {
        safeGetElement('registerModal').style.display = 'block';
    });
}

async function displayProducts() {
    const grid = safeGetElement('productsGrid');
    if (!grid) return;
    
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        
        grid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>R$ ${product.price.toFixed(2)}</p>
                    <p>Vendedor: ${product.seller_name}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${product.city}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        grid.innerHTML = '<p>Erro ao carregar produtos</p>';
    }
}
