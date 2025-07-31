// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Maçãs Orgânicas",
        price: 8.99,
        seller: "Fazenda Harmonia",
        phone: "5511987654321",
        state: "SP",
        city: "São Paulo",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Maçãs cultivadas sem agrotóxicos, colhidas no ponto ideal de maturação."
    },
    {
        id: 2,
        name: "Bananas Orgânicas",
        price: 5.49,
        seller: "Sítio Natureza",
        phone: "5521987654321",
        state: "RJ",
        city: "Rio de Janeiro",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Bananas cultivadas com adubação orgânica e sem pesticidas químicos."
    },
    {
        id: 3,
        name: "Arroz Integral Orgânico",
        price: 12.90,
        seller: "Agroecológica",
        phone: "5531987654321",
        state: "MG",
        city: "Belo Horizonte",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Arroz integral cultivado de forma sustentável, rico em fibras e nutrientes."
    },
    {
        id: 4,
        name: "Mel Orgânico",
        price: 22.50,
        seller: "Abelhas do Bem",
        phone: "5551987654321",
        state: "RS",
        city: "Porto Alegre",
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Mel puro produzido por abelhas em áreas de floresta nativa."
    },
    {
        id: 5,
        name: "Café Orgânico",
        price: 18.75,
        seller: "Café da Montanha",
        phone: "5541987654321",
        state: "PR",
        city: "Curitiba",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Café cultivado em sistema agroflorestal, com torra média para melhor sabor."
    },
    {
        id: 6,
        name: "Ovos Caipiras Orgânicos",
        price: 15.90,
        seller: "Granja Vida Livre",
        phone: "5511998765432",
        state: "SP",
        city: "Campinas",
        image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Ovos de galinhas criadas soltas, alimentadas com ração orgânica."
    },
    {
        id: 7,
        name: "Tomates Orgânicos",
        price: 7.80,
        seller: "Horta Viva",
        phone: "5521998765432",
        state: "RJ",
        city: "Niterói",
        image: "https://images.unsplash.com/photo-1594282416557-6c5d2609122a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Tomates cultivados sem agrotóxicos, colhidos diariamente."
    },
    {
        id: 8,
        name: "Azeite de Oliva Orgânico",
        price: 35.00,
        seller: "Olivais do Sul",
        phone: "5551998765432",
        state: "RS",
        city: "Pelotas",
        image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Azeite extra virgem prensado a frio, de olivas cultivadas organicamente."
    },
    {
        id: 9,
        name: "Chá Verde Orgânico",
        price: 14.20,
        seller: "Ervas da Terra",
        phone: "5531998765432",
        state: "MG",
        city: "Ouro Preto",
        image: "https://images.unsplash.com/photo-1559177581-5373e8a697f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Chá verde cultivado em montanhas, rico em antioxidantes."
    },
    {
        id: 10,
        name: "Sabonetes Orgânicos",
        price: 9.90,
        seller: "Essência Natural",
        phone: "5541998765432",
        state: "PR",
        city: "Londrina",
        image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Sabonetes artesanais feitos com óleos vegetais e essências naturais."
    }
];

// Carrinho de compras
let cart = [];
let cartCount = 0;

// Sistema de Chat
let currentChatProduct = null;
let chatMessages = JSON.parse(localStorage.getItem('goOrganicChatMessages')) || {};

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const stateFilter = document.getElementById('stateFilter');
const cityFilter = document.getElementById('cityFilter');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const cartBtn = document.getElementById('cartBtn');
const cartCountElement = document.getElementById('cartCount');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const cartModal = document.getElementById('cartModal');
const closeButtons = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const clientType = document.getElementById('clientType');
const sellerType = document.getElementById('sellerType');
const sellerFields = document.getElementById('sellerFields');
const chatModal = document.getElementById('chatModal');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatMessageInput = document.getElementById('chatMessageInput');

// Função para renderizar os produtos
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">Nenhum produto encontrado</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-seller">Vendedor: ${product.seller}</p>
                <p class="product-location">
                    <i class="fas fa-map-marker-alt"></i> ${product.city}, ${product.state}
                </p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="decrease-btn" data-id="${product.id}">-</button>
                        <span class="quantity" data-id="${product.id}">1</span>
                        <button class="increase-btn" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
                </div>
                <div class="product-contact">
                    <a href="#" class="contact-btn whatsapp-btn" data-id="${product.id}" data-seller="${product.seller}" data-phone="${product.phone}">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="#" class="contact-btn chat-btn" data-id="${product.id}" data-seller="${product.seller}">
                        <i class="fas fa-comment"></i> Chat
                    </a>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Adiciona eventos aos botões de quantidade
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    // Adiciona eventos aos botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
    
    // Adiciona eventos aos botões de contato
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', openWhatsApp);
    });
    
    document.querySelectorAll('.chat-btn').forEach(btn => {
        btn.addEventListener('click', openChat);
    });
}

// Função para filtrar produtos
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedState = stateFilter.value;
    const selectedCity = cityFilter.value;
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.seller.toLowerCase().includes(searchTerm);
        const matchesState = selectedState ? product.state === selectedState : true;
        const matchesCity = selectedCity ? product.city === selectedCity : true;
        
        return matchesSearch && matchesState && matchesCity;
    });
    
    renderProducts(filteredProducts);
    setTimeout(handleScroll, 100);
}

// Função para diminuir quantidade
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

// Função para aumentar quantidade
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    let quantity = parseInt(quantityElement.textContent);
    
    quantity++;
    quantityElement.textContent = quantity;
}

// Função para adicionar ao carrinho
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    const quantity = parseInt(quantityElement.textContent);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    cartCount += quantity;
    cartCountElement.textContent = cartCount;
    
    // Reset quantity
    quantityElement.textContent = '1';
    
    // Mostra feedback visual
    e.target.textContent = 'Adicionado!';
    setTimeout(() => {
        e.target.textContent = 'Adicionar';
    }, 1000);
}

// Função para abrir WhatsApp
function openWhatsApp(e) {
    e.preventDefault();
    const phone = e.target.getAttribute('data-phone');
    const productName = e.target.closest('.product-card').querySelector('.product-title').textContent;
    const seller = e.target.getAttribute('data-seller');
    
    const message = `Olá ${seller}, estou interessado(a) no produto ${productName} que vi no Go Organic. Poderia me fornecer mais informações?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Função para salvar mensagens no localStorage
function saveChatMessages() {
    localStorage.setItem('goOrganicChatMessages', JSON.stringify(chatMessages));
}

// Função para renderizar mensagens do chat
function renderChatMessages(productId) {
    const chatContainer = document.getElementById('chatMessages');
    chatContainer.innerHTML = '';
    
    if (chatMessages[productId]) {
        chatMessages[productId].forEach((msg, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'seller' ? 'received' : 'sent'} ${index === chatMessages[productId].length - 1 ? 'new-message' : ''}`;
            messageDiv.innerHTML = `
                <div>${msg.text}</div>
                <div class="message-time">${msg.time} - ${msg.sender === 'seller' ? currentChatProduct.seller : 'Você'}</div>
            `;
            chatContainer.appendChild(messageDiv);
        });
    }
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Função para enviar mensagem
function sendMessage() {
    const message = chatMessageInput.value.trim();
    
    if (message && currentChatProduct) {
        const productId = currentChatProduct.id;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Inicializa array de mensagens se não existir
        if (!chatMessages[productId]) {
            chatMessages[productId] = [];
        }
        
        // Adiciona mensagem do usuário
        chatMessages[productId].push({
            text: message,
            sender: 'user',
            time: time
        });
        
        saveChatMessages();
        renderChatMessages(productId);
        chatMessageInput.value = '';
        
        // Simula resposta do vendedor após 1-3 segundos
        setTimeout(() => {
            const responses = [
                "Obrigado pela sua mensagem! Como posso ajudar?",
                "Interessado em fazer uma compra?",
                "Posso oferecer mais informações sobre este produto.",
                "Este produto está disponível para entrega imediata.",
                "Posso verificar o estoque para você."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            chatMessages[productId].push({
                text: randomResponse,
                sender: 'seller',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            
            saveChatMessages();
            renderChatMessages(productId);
            
            // Notificação visual
            const chatBtn = document.querySelector(`.chat-btn[data-id="${productId}"]`);
            if (chatBtn) {
                chatBtn.classList.add('has-new-message');
            }
        }, 1000 + Math.random() * 2000);
    }
}

// Função para abrir o chat
function openChat(e) {
    e.preventDefault();
    const productId = e.target.getAttribute('data-id');
    const seller = e.target.getAttribute('data-seller');
    const product = products.find(p => p.id === parseInt(productId));
    
    currentChatProduct = product;
    
    // Inicializa mensagens se não existirem
    if (!chatMessages[productId]) {
        chatMessages[productId] = [
            {
                text: `Olá! Sou ${seller}. Como posso ajudar com o produto ${product.name}?`,
                sender: 'seller',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ];
        saveChatMessages();
    }
    
    // Atualiza o cabeçalho do chat
    document.getElementById('chatSellerName').textContent = seller;
    document.getElementById('chatProductInfo').textContent = `Produto: ${product.name} - R$ ${product.price.toFixed(2)}`;
    
    // Renderiza as mensagens
    renderChatMessages(productId);
    
    // Abre o modal e foca no input
    chatModal.style.display = 'block';
    chatMessageInput.focus();
}

// Função para renderizar o carrinho
function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <p class="cart-item-title">${item.name}</p>
                <p>${item.quantity} x R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <p class="cart-item-price">R$ ${itemTotal.toFixed(2)}</p>
                <span class="cart-item-remove" data-id="${item.id}">Remover</span>
            </div>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adiciona eventos aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Função para remover do carrinho
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cartCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        cartCountElement.textContent = cartCount;
        renderCart();
    }
}

// Função para finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    alert('Compra finalizada com sucesso! Obrigado por comprar na Go Organic.');
    cart = [];
    cartCount = 0;
    cartCountElement.textContent = '0';
    cartModal.style.display = 'none';
    renderCart();
}

// Função para inicializar o sistema de chat
function initChatSystem() {
    // Verifica se há mensagens não lidas
    Object.keys(chatMessages).forEach(productId => {
        const lastMessage = chatMessages[productId][chatMessages[productId].length - 1];
        if (lastMessage.sender === 'seller') {
            const chatBtn = document.querySelector(`.chat-btn[data-id="${productId}"]`);
            if (chatBtn) {
                chatBtn.classList.add('has-new-message');
            }
        }
    });
}

// Variável para controle do estado do header
let headerExpanded = true;

// Função para manipular o scroll
function handleScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    const productsGrid = document.getElementById('productsGrid');
    
    // Verifica se há produtos visíveis na tela
    const isProductVisible = () => {
        if (productsGrid.children.length === 0) return false;
        const firstProduct = productsGrid.children[0];
        const rect = firstProduct.getBoundingClientRect();
        return rect.top < window.innerHeight;
    };

    if (scrollPosition > 100 && !isProductVisible()) {
        if (headerExpanded) {
            header.classList.add('scrolled');
            headerExpanded = false;
        }
    } else {
        if (!headerExpanded) {
            header.classList.remove('scrolled');
            headerExpanded = true;
        }
    }
}

// Observador de mutação para detectar adição de produtos
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            const header = document.querySelector('.header');
            header.classList.remove('scrolled');
            headerExpanded = true;
        }
    });
});

// Event Listeners
searchInput.addEventListener('input', filterProducts);
searchButton.addEventListener('click', filterProducts);
stateFilter.addEventListener('change', filterProducts);
cityFilter.addEventListener('change', filterProducts);

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

cartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        cartModal.style.display = 'none';
        chatModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === chatModal) {
        chatModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulação de login
    alert(`Login realizado com o email: ${email}`);
    loginModal.style.display = 'none';
    loginForm.reset();
});

// Mostrar/ocultar campos de vendedor
clientType.addEventListener('change', function() {
    if(this.checked) {
        sellerFields.style.display = 'none';
    }
});

sellerType.addEventListener('change', function() {
    if(this.checked) {
        sellerFields.style.display = 'block';
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const state = document.getElementById('registerState').value;
    const city = document.getElementById('registerCity').value;
    
    let userData = {
        userType,
        name,
        email,
        password,
        state,
        city
    };
    
    if(userType === 'seller') {
        userData.businessName = document.getElementById('sellerBusinessName').value;
        userData.cnpj = document.getElementById('sellerCNPJ').value;
        userData.description = document.getElementById('sellerDescription').value;
        userData.phone = document.getElementById('sellerPhone').value;
        
        // Adiciona o vendedor como um novo produto (simulação)
        if(userData.businessName && userData.phone) {
            const newSellerProduct = {
                id: products.length + 1,
                name: `Produto de ${userData.businessName}`,
                price: 0,
                seller: userData.businessName,
                phone: userData.phone,
                state: userData.state,
                city: userData.city,
                image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                description: userData.description || "Novo produto orgânico"
            };
            products.push(newSellerProduct);
        }
    }
    
    // Simulação de cadastro
    alert(`Cadastro de ${userType === 'client' ? 'Cliente' : 'Vendedor'} realizado com sucesso!\nNome: ${name}\nEmail: ${email}`);
    registerModal.style.display = 'none';
    registerForm.reset();
    sellerFields.style.display = 'none';
    clientType.checked = true;
    
    // Atualiza a lista de produtos
    filterProducts();
});

checkoutBtn.addEventListener('click', checkout);

// Event Listeners para o chat
sendMessageBtn.addEventListener('click', sendMessage);

chatMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    initChatSystem();
    
    // Configura o observador para monitorar adições de produtos
    const productsGrid = document.getElementById('productsGrid');
    observer.observe(productsGrid, { childList: true });
    
    // Adiciona o event listener para scroll
    window.addEventListener('scroll', handleScroll);
});