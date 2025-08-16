document.addEventListener('DOMContentLoaded', (event) => {
    setupUIListeners();
    displayProducts();
});

// Funções de utilidade
async function safeParseJSON(response) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }
    return await response.text();
}

function safeGetElement(id) {
    return document.getElementById(id) || null;
}

function safeAddListener(idOrElement, event, handler) {
    let el = typeof idOrElement === 'string' ? document.getElementById(idOrElement) : idOrElement;
    if (el) {
        el.addEventListener(event, handler);
    } else {
        console.warn(`Elemento para listener não encontrado: ${idOrElement}`);
    }
}

function displayProducts() {
    const productsGrid = safeGetElement('productsGrid');
    if (!productsGrid) {
        console.warn("Elemento 'productsGrid' não encontrado.");
        return;
    }
    
    async function fetchAndRenderProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            const products = await safeParseJSON(response);

            if (response.ok) {
                productsGrid.innerHTML = '';
                if (products.length === 0) {
                    productsGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
                    return;
                }
                
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image_url || 'https://via.placeholder.com/200'}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-meta">
                                <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                                <span class="product-unit"> / ${product.unit_of_measure}</span>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-add-to-cart">Adicionar</button>
                                <button class="btn btn-chat">Chat</button>
                            </div>
                        </div>
                    `;
                    productsGrid.appendChild(productCard);
                });

            } else {
                console.error('Falha ao carregar produtos:', products.message);
                productsGrid.innerHTML = `<p>Erro ao carregar produtos: ${products.message}</p>`;
            }
        } catch (error) {
            console.error('Erro de rede ao carregar produtos:', error);
            productsGrid.innerHTML = '<p>Não foi possível se conectar ao servidor para carregar os produtos.</p>';
        }
    }
    fetchAndRenderProducts();
}


function handleSuccessfulLogin(user_type, token) {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Login realizado com sucesso!'
    });
    localStorage.setItem('userRole', user_type);
    localStorage.setItem('token', token);

    // Lógica de redirecionamento com base no tipo de usuário
    if (user_type === 'admin') {
        window.location.href = 'painel-admin.html';
    } else if (user_type === 'cliente') {
        window.location.href = 'painel-cliente.html';
    } else if (user_type === 'vendedor') {
        window.location.href = 'painel-vendedor.html';
    } else {
        // Redireciona para a página inicial caso o tipo de usuário não seja reconhecido
        window.location.href = 'index.html';
    }
}

function setupRegisterForm(elements) {
    const registerForm = safeGetElement('registerForm');
    const switchToLogin = safeGetElement('switchToLogin');

    if (switchToLogin) {
        safeAddListener(switchToLogin, 'click', (e) => {
            e.preventDefault();
            if (elements.registerModal) elements.registerModal.style.display = 'none';
            if (elements.loginModal) elements.loginModal.style.display = 'block';
        });
    }

    if (registerForm) {
        safeAddListener(registerForm, 'submit', async (e) => {
            e.preventDefault();

            const user_type = document.querySelector('input[name="user_typeRegister"]:checked')?.value;
            if (!user_type) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Validação!',
                    text: 'Selecione o tipo de usuário (Cliente, Vendedor ou Admin).'
                });
                return;
            }

            const name = safeGetElement('registerName')?.value;
            const email = safeGetElement('registerEmail')?.value;
            const password = safeGetElement('registerPassword')?.value;
            const phone = safeGetElement('registerPhone')?.value;

            let state = '';
            let city = '';
            let business_name = '';
            let cnpj = '';
            let description = '';

            if (user_type === 'vendedor') {
                state = safeGetElement('registerState')?.value;
                city = safeGetElement('registerCity')?.value;
                business_name = safeGetElement('registerBusinessName')?.value;
                cnpj = safeGetElement('registerCNPJ')?.value;
                description = safeGetElement('registerDescription')?.value;
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        phone,
                        user_type,
                        state,
                        city,
                        business_name,
                        cnpj,
                        description
                    })
                });

                const data = await safeParseJSON(response);

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Cadastro realizado com sucesso!'
                    });
                    if (elements.registerModal) elements.registerModal.style.display = 'none';
                    if (elements.loginModal) elements.loginModal.style.display = 'block';
                } else {
                    const errorMessage = data.message || "Erro desconhecido ao tentar fazer cadastro.";
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro no Cadastro!',
                        text: errorMessage
                    });
                }
            } catch (error) {
                console.error('Erro no cadastro:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no Cadastro!',
                    text: 'Erro desconhecido ao tentar fazer cadastro.'
                });
            }
            if (registerForm) registerForm.reset();
        });
    } else {
        console.warn("Elemento 'registerForm' não encontrado nesta página.");
    }
}

function setupLoginForm(elements) {
    const loginForm = safeGetElement('loginForm');
    const switchToRegister = safeGetElement('switchToRegister');

    if (switchToRegister) {
        safeAddListener(switchToRegister, 'click', (e) => {
            e.preventDefault();
            if (elements.loginModal) elements.loginModal.style.display = 'none';
            if (elements.registerModal) elements.registerModal.style.display = 'block';
        });
    }

    if (loginForm) {
        safeAddListener(loginForm, 'submit', async (e) => {
            e.preventDefault();

            const user_type = document.querySelector('input[name="user_typeLogin"]:checked')?.value;
            if (!user_type) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Validação!',
                    text: 'Selecione o tipo de usuário (Cliente, Vendedor ou Admin).'
                });
                return;
            }

            const email = safeGetElement('loginEmail')?.value;
            const password = safeGetElement('loginPassword')?.value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, user_type })
                });

                const data = await safeParseJSON(response);
                if (response.ok) {
                    handleSuccessfulLogin(data.user_type, data.token);
                } else {
                    const errorMessage = data.message || "Erro desconhecido ao tentar fazer login.";
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro no Login!',
                        text: errorMessage
                    });
                }
            } catch (error) {
                console.error('Erro no login:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no Login!',
                    text: 'Erro desconhecido ao tentar fazer login.'
                });
            }
            if (loginForm) loginForm.reset();
        });
    } else {
        console.warn("Elemento 'loginForm' não encontrado nesta página.");
    }
}

// Estados e cidades disponíveis
const brazilianStates = [
    { code: "AC", name: "Acre" },
    { code: "AL", name: "Alagoas" },
    { code: "AP", name: "Amapá" },
    { code: "AM", name: "Amazonas" },
    { code: "BA", name: "Bahia" },
    { code: "CE", name: "Ceará" },
    { code: "DF", name: "Distrito Federal" },
    { code: "ES", name: "Espírito Santo" },
    { code: "GO", name: "Goiás" },
    { code: "MA", name: "Maranhão" },
    { code: "MT", name: "Mato Grosso" },
    { code: "MS", name: "Mato Grosso do Sul" },
    { code: "MG", name: "Minas Gerais" },
    { code: "PA", name: "Pará" },
    { code: "PB", name: "Paraíba" },
    { code: "PR", name: "Paraná" },
    { code: "PE", name: "Pernambuco" },
    { code: "PI", name: "Piauí" },
    { code: "RJ", name: "Rio de Janeiro" },
    { code: "RN", name: "Rio Grande do Norte" },
    { code: "RS", name: "Rio Grande do Sul" },
    { code: "RO", name: "Rondônia" },
    { code: "RR", name: "Roraima" },
    { code: "SC", name: "Santa Catarina" },
    { code: "SP", name: "São Paulo" },
    { code: "SE", name: "Sergipe" },
    { code: "TO", name: "Tocantins" }
];

const citiesByState = {
    "AC": ["Rio Branco", "Cruzeiro do Sul"],
    "AL": ["Maceió", "Arapiraca"],
    "AM": ["Manaus", "Parintins"],
    "AP": ["Macapá", "Santana"],
    "BA": ["Salvador", "Feira de Santana"],
    "CE": ["Fortaleza", "Caucaia"],
    "DF": ["Brasília"],
    "ES": ["Serra", "Vila Velha"],
    "GO": ["Goiânia", "Aparecida de Goiânia"],
    "MA": ["São Luís", "Imperatriz"],
    "MT": ["Cuiabá", "Várzea Grande"],
    "MS": ["Campo Grande", "Dourados"],
    "MG": ["Belo Horizonte", "Uberlândia"],
    "PA": ["Belém", "Ananindeua"],
    "PB": ["João Pessoa", "Campina Grande"],
    "PR": ["Curitiba", "Londrina"],
    "PE": ["Recife", "Jaboatão dos Guararapes"],
    "PI": ["Teresina", "Parnaíba"],
    "RJ": ["Rio de Janeiro", "São Gonçalo"],
    "RN": ["Natal", "Mossoró"],
    "RS": ["Porto Alegre", "Caxias do Sul"],
    "RO": ["Porto Velho", "Ji-Paraná"],
    "RR": ["Boa Vista", "Rorainópolis"],
    "SC": ["Joinville", "Florianópolis"],
    "SP": ["São Paulo", "Guarulhos"],
    "SE": ["Aracaju", "Nossa Senhora do Socorro"],
    "TO": ["Palmas", "Araguaína"]
};


function setupUIListeners() {
    const loginBtn = safeGetElement('loginBtn');
    const registerBtn = safeGetElement('registerBtn');
    const closeLoginModalBtn = safeGetElement('closeLoginModal');
    const closeRegisterModalBtn = safeGetElement('closeRegisterModal');
    const loginModal = safeGetElement('loginModal');
    const registerModal = safeGetElement('registerModal');
    
    const elements = {
        loginModal,
        registerModal,
    };

    safeAddListener(loginBtn, 'click', () => {
        if (loginModal) loginModal.style.display = 'block';
    });

    safeAddListener(registerBtn, 'click', () => {
        if (registerModal) registerModal.style.display = 'block';
    });
    
    safeAddListener(closeLoginModalBtn, 'click', () => {
        if (loginModal) loginModal.style.display = 'none';
    });

    safeAddListener(closeRegisterModalBtn, 'click', () => {
        if (registerModal) registerModal.style.display = 'none';
    });
    
    safeAddListener(window, 'click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    if (loginModal) setupLoginForm(elements);
    if (registerModal) setupRegisterForm(elements);
    
    const stateFilter = safeGetElement('stateFilter');
    const cityFilter = safeGetElement('cityFilter');
    
    if (stateFilter) {
        brazilianStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            stateFilter.appendChild(option);
        });
        
        safeAddListener(stateFilter, 'change', () => {
            const selectedState = stateFilter.value;
            cityFilter.innerHTML = '<option value="">Todas as cidades</option>';
            if (selectedState && citiesByState[selectedState]) {
                citiesByState[selectedState].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    cityFilter.appendChild(option);
                });
            }
        });
    }

    setupProductForm();
}

function setupProductForm() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const productPrice = parseFloat(document.getElementById('productPrice').value);
            const productImage = document.getElementById('productImage').value;

            const productState = document.getElementById('productState').value;
            const productCity = document.getElementById('productCity').value;
            const productCategory = document.getElementById('productCategory').value;
            const productQuantity = parseInt(document.getElementById('productQuantity').value);
            const productUnit = document.getElementById('productUnit').value;

            const token = localStorage.getItem('token');

            if (!token) {
                Swal.fire('Erro!', 'Token de autenticação não encontrado. Faça o login novamente.', 'error');
                return;
            }

            const productData = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: productImage,
                state: productState,
                city: productCity,
                category_id: parseInt(productCategory),
                available_quantity: productQuantity,
                unit_of_measure: productUnit
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

                const result = await safeParseJSON(response);

                if (response.ok) {
                    Swal.fire('Sucesso!', 'Produto cadastrado com sucesso.', 'success');
                    productForm.reset();
                } else {
                    Swal.fire('Erro!', `Falha ao cadastrar produto: ${result.message}`, 'error');
                }
            } catch (error) {
                console.error('Erro no cadastro de produto:', error);
                Swal.fire('Erro!', 'Não foi possível se conectar ao servidor.', 'error');
            }
        });
    } else {
        console.warn("Elemento 'productForm' não encontrado nesta página.");
    }
};