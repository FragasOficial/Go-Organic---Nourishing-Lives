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
        console.warn(`Elemento para listener não encontrado:`, idOrElement);
    }
}

function displayProducts() {
    if (typeof filterProducts === "function") {
        filterProducts();
    } else {
        console.warn("Função filterProducts não encontrada, exibindo todos produtos.");
        if (typeof renderProducts === "function" && Array.isArray(products)) {
            renderProducts(products);
        }
    }
}

function handleSuccessfulLogin(user_type) {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Login realizado com sucesso!'
    });
    localStorage.setItem('userRole', user_type);
    if (user_type === 'cliente') {
        window.location.href = 'painel-cliente.html';
    } else if (user_type === 'vendedor') {
        window.location.href = 'painel-vendedor.html';
    } else if (user_type === 'admin') {
        window.location.href = 'painel-admin.html';
    }
}

function setupRegisterForm(elements) {
    const registerForm = document.getElementById('registerForm');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            elements.registerModal.style.display = 'none';
            elements.loginModal.style.display = 'block';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const user_type = document.querySelector('input[name="user_typeRegister"]:checked').value;
            const name = (document.getElementById('registerName') ? document.getElementById('registerName').value : '');
            const email = (document.getElementById('registerEmail') ? document.getElementById('registerEmail').value : '');
            const password = (document.getElementById('registerPassword') ? document.getElementById('registerPassword').value : '');
            const phone = (document.getElementById('registerPhone') ? document.getElementById('registerPhone').value : '');
            let state = '';
            let city = '';
            let business_name = '';
            let cnpj = '';
            let description = '';
            
            // Coletar dados adicionais para o vendedor, se aplicável
            if (user_type === 'vendedor') {
                state = (document.getElementById('registerState') ? document.getElementById('registerState').value : '');
                city = (document.getElementById('registerCity') ? document.getElementById('registerCity').value : '');
                business_name = (document.getElementById('registerBusinessName') ? document.getElementById('registerBusinessName').value : '');
                cnpj = (document.getElementById('registerCNPJ') ? document.getElementById('registerCNPJ').value : '');
                description = (document.getElementById('registerDescription') ? document.getElementById('registerDescription').value : '');
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

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Cadastro realizado com sucesso!'
                    });
                    elements.registerModal.style.display = 'none';
                    elements.loginModal.style.display = 'block';
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

            registerForm.reset();
        });
    } else {
        console.error("Elemento 'registerForm' não encontrado.");
    }
}

function setupLoginForm(elements) {
    const loginForm = document.getElementById('loginForm');
    const switchToRegister = document.getElementById('switchToRegister');

    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            elements.loginModal.style.display = 'none';
            elements.registerModal.style.display = 'block';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const user_type = document.querySelector('input[name="user_typeLogin"]:checked').value;
            const email = (document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : '');
            const password = (document.getElementById('loginPassword') ? document.getElementById('loginPassword').value : '');

            try {
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, user_type })
                });

                const data = await response.json();

                if (response.ok) {
                    handleSuccessfulLogin(user_type);
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

            loginForm.reset();
        });
    } else {
        console.error("Elemento 'loginForm' não encontrado.");
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
    "AC": [ "Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó", "Brasiléia", "Senador Guiomard", "Plácido de Castro", "Xapuri", "Mâncio Lima", "Rodrigues Alves", "Porto Acre", "Epitaciolândia", "Marechal Thaumaturgo", "Porto Walter", "Capixaba", "Bujari", "Acrelândia", "Assis Brasil", "Manoel Urbano" ],
    "AL": [ "Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "União dos Palmares", "Penedo", "São Miguel dos Campos", "Santana do Ipanema", "Delmiro Gouveia", "Campo Alegre", "Coruripe", "Teotônio Vilela", "Pilar", "São Luís do Quitunde", "Atalaia", "Marechal Deodoro", "Murici", "Matriz de Camaragibe", "Piranhas", "Boca da Mata" ],
    "AM": [ "Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari", "Tabatinga", "Maues", "Tefé", "Humaitá", "São Gabriel da Cachoeira", "Iranduba", "Manicoré", "Lábrea", "Borba", "Benjamin Constant", "Autazes", "Careiro", "Eirunepé", "Nova Olinda do Norte", "Presidente Figueiredo" ],
    "AP": [ "Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Porto Grande", "Mazagão", "Tartarugalzinho", "Pedra Branca do Amapari", "Calçoene", "Amapá", "Ferreira Gomes", "Cutias", "Pracuúba", "Serra do Navio", "Itaubal", "Vitória do Jari", "Augusto Correa", "Cachoeira do Arari", "Curralinho", "São Sebastião da Boa Vista" ],
    "BA": [ "Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro", "Lauro de Freitas", "Ilhéus", "Jequié", "Barreiras", "Teixeira de Freitas", "Porto Seguro", "Alagoinhas", "Simões Filho", "Paulo Afonso", "Eunápolis", "Santo Antônio de Jesus", "Valença", "Candeias", "Guanambi" ],
    "CE": [ "Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá", "Canindé", "Pacajus", "Aquiraz", "Tianguá", "Quixeramobim", "Russas", "Aracati", "Cascavel", "Horizonte", "Pacatuba" ],
    "DF": [ "Brasília", "Ceilândia", "Taguatinga", "Samambaia", "Plano Piloto", "Guará", "Gama", "Recanto das Emas", "Santa Maria", "Riacho Fundo", "Águas Claras", "Sobradinho", "Vicente Pires", "Planaltina", "Paranoá", "São Sebastião", "Cruzeiro", "Jardim Botânico", "Sudoeste/Octogonal", "Lago Norte" ],
    "ES": [ "Serra", "Vila Velha", "Cariacica", "Vitória", "Cachoeiro de Itapemirim", "Linhares", "Guarapari", "São Mateus", "Colatina", "Aracruz", "Viana", "Nova Venécia", "Barra de São Francisco", "Marataízes", "São Gabriel da Palha", "Itapemirim", "Baixo Guandu", "Castelo", "Alfredo Chaves", "Conceição da Barra" ],
    "GO": [ "Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama", "Jataí", "Itumbiara", "Catalão", "Senador Canedo", "Santo Antônio do Descoberto", "Goianésia", "Planaltina", "Mineiros", "Cristalina", "Inhumas" ],
    "MA": [ "São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas", "Santa Inês", "Pinheiro", "Chapadinha", "Barra do Corda", "Coroatá", "Grajaú", "Tutóia", "Viana", "Zé Doca", "Barreirinhas" ],
    "MT": [ "Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Sorriso", "Lucas do Rio Verde", "Primavera do Leste", "Barra do Garças", "Alta Floresta", "Pontes e Lacerda", "Juína", "Nova Mutum", "Guarantã do Norte", "Campo Novo do Parecis", "Poconé", "Colíder", "Água Boa", "Juara" ],
    "MS": [ "Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Aquidauana", "Naviraí", "Nova Andradina", "Sidrolândia", "Paranaíba", "Maracaju", "Coxim", "Amambai", "Rio Brilhante", "Chapadão do Sul", "Miranda", "Jardim", "Aparecida do Taboado", "Inocência", "Fátima do Sul" ],
    "MG": [ "Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Santa Luzia", "Ipatinga", "Sete Lagoas", "Divinópolis", "Teófilo Otoni", "Coronel Fabriciano", "Itabira", "Patos de Minas", "Varginha", "Araguari", "Poços de Caldas" ],
    "PA": [ "Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal", "Abaetetuba", "Cametá", "Marituba", "Bragança", "Paragominas", "Tucuruí", "Barcarena", "Altamira", "Tailândia", "Breves", "São Félix do Xingu", "Redenção", "Moju", "Novo Repartimento" ],
    "PB": [ "João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cabedelo", "Cajazeiras", "Guarabira", "Sapé", "Mamanguape", "Queimadas", "Monteiro", "Esperança", "Catolé do Rocha", "Conde", "Lagoa Seca", "Bananeiras", "Solânea", "Itabaiana" ],
    "PR": [ "Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá", "Araucária", "Toledo", "Apucarana", "Campo Mourão", "Pinhais", "Almirante Tamandaré", "Umuarama", "Piraquara", "Sarandi", "Cambé" ],
    "PE": [ "Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão", "São Lourenço da Mata", "Santa Cruz do Capibaribe", "Igarassu", "Gravatá", "Goiana", "Arcoverde", "Serra Talhada", "Belo Jardim", "Carpina", "Limoeiro" ],
    "PI": [ "Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Barras", "Campo Maior", "Altos", "União", "José de Freitas", "Esperantina", "Oeiras", "São Raimundo Nonato", "Pedro II", "Luzilândia", "Corrente", "Bom Jesus", "Miguel Alves", "Uruçuí", "Valença do Piauí" ],
    "RJ": [ "Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "São João de Meriti", "Campos dos Goytacazes", "Petrópolis", "Volta Redonda", "Macaé", "Magé", "Itaboraí", "Cabo Frio", "Angra dos Reis", "Nova Friburgo", "Barra Mansa", "Mesquita", "Nilópolis", "Teresópolis" ],
    "RN": [ "Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Caicó", "Assu", "Currais Novos", "São José de Mipibu", "Santa Cruz", "Apodi", "Goianinha", "João Câmara", "Touros", "Macau", "Pau dos Ferros", "Nova Cruz", "Extremoz", "Canguaretama" ],
    "RS": [ "Porto Alegre", "Caxias do Sul", "Canoas", "Pelotas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul", "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba" ],
    "RO": [ "Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura", "Jaru", "Guajará-Mirim", "Ouro Preto do Oeste", "Pimenta Bueno", "Colorado do Oeste", "Machadinho D'Oeste", "Buritis", "Espigão D'Oeste", "Nova Mamoré", "São Miguel do Guaporé", "Alto Paraíso", "Cerejeiras", "Costa Marques", "Presidente Médici" ],
    "RR": [ "Boa Vista", "Rorainópolis", "Caracaraí", "Pacaraima", "Mucajaí", "Cantanhede", "Alto Alegre", "Bonfim", "Normandia", "São Luiz", "São João da Baliza", "Iracema", "Uiramutã", "Amajari", "Caroebe", "Urucurituba", "Autazes", "Barcelos", "Barreirinha", "Boa Vista" ],
    "SC": [ "Joinville", "Florianópolis", "Blumenau", "São José", "Chapecó", "Itajaí", "Criciúma", "Jaraguá do Sul", "Palhoça", "Lages", "Balneário Camboriú", "Brusque", "Tubarão", "Rio do Sul", "Caçador", "Concórdia", "Araranguá", "Gaspar", "Indaial", "Fraiburgo" ],
    "SP": [ "São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "São José dos Campos", "Santo André", "Ribeirão Preto", "Osasco", "Sorocaba", "Mauá", "São José do Rio Preto", "Santos", "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba", "Piracicaba", "Bauru", "São Vicente", "Itaquaquecetuba" ],
    "SE": [ "Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "São Cristóvão", "Estância", "Tobias Barreto", "Simão Dias", "Poço Redondo", "Nossa Senhora da Glória", "Itaporanga d'Ajuda", "Capela", "Porto da Folha", "Laranjeiras", " Propriá", "Canindé de São Francisco", "Barra dos Coqueiros", "Frei Paulo", "Poço Verde", "Campo do Brito" ],
    "TO": [ "Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Araguatins", "Colinas do Tocantins", "Guaraí", "Tocantinópolis", "Dianópolis", "Augustinópolis", "Axixá do Tocantins", "Formoso do Araguaia", "Miracema do Tocantins", "Palmeirópolis", "Pedro Afonso", "Alvorada", "Goiatins", "Ponte Alta do Tocantins", "Combinado" ]
};


function setupUIListeners() {
    const loginBtn = safeGetElement('loginBtn');
    const registerBtn = safeGetElement('registerBtn');
    const closeLoginModalBtn = safeGetElement('closeLoginModal');
    const closeRegisterModalBtn = safeGetElement('closeRegisterModal');
    const closeRegionConfirmModalBtn = safeGetElement('regionConfirmModal .close');
    const registerModal = safeGetElement('registerModal');
    const loginModal = safeGetElement('loginModal');
    const regionConfirmModal = safeGetElement('regionConfirmModal');
    const stateFilter = safeGetElement('stateFilter');
    const cityFilter = safeGetElement('cityFilter');
    const userRole = localStorage.getItem('userRole');

    const elements = {
        loginModal,
        registerModal,
        regionConfirmModal,
        stateFilter,
        cityFilter
    };

    safeAddListener(loginBtn, 'click', () => {
        if (elements.loginModal) elements.loginModal.style.display = 'block';
    });

    safeAddListener(registerBtn, 'click', () => {
        if (elements.registerModal) elements.registerModal.style.display = 'block';
    });
    
    // Configura os formulários
    if (elements.registerModal) {
        setupRegisterForm(elements);
    } else {
        console.warn("Elemento 'registerForm' não encontrado nesta página.");
    }
    
    if (elements.loginModal) {
        setupLoginForm(elements);
    } else {
        console.warn("Elemento 'loginForm' não encontrado nesta página.");
    }

    safeAddListener(closeLoginModalBtn, 'click', () => {
        if (elements.loginModal) elements.loginModal.style.display = 'none';
    });

    safeAddListener(closeRegisterModalBtn, 'click', () => {
        if (elements.registerModal) elements.registerModal.style.display = 'none';
    });
    
    safeAddListener(window, 'click', (event) => {
        if (event.target == elements.loginModal) {
            elements.loginModal.style.display = 'none';
        }
        if (event.target == elements.registerModal) {
            elements.registerModal.style.display = 'none';
        }
    });

    // Filtros de estado e cidade
    if (stateFilter) {
        brazilianStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = state.name;
            stateFilter.appendChild(option);
        });
    }

    if (stateFilter && cityFilter) {
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
}

// Exemplo de como a função deve estar no seu script.js
async function cadastrarProduto() {
    // ... lógica para obter os dados do formulário ...
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').value;

    const token = localStorage.getItem('token'); // Obtém o token de autenticação

    if (!token) {
        Swal.fire('Erro!', 'Token de autenticação não encontrado. Faça o login novamente.', 'error');
        return;
    }
    
    const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage
    };

    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token // Envia o token no cabeçalho
            },
            body: JSON.stringify(productData)
        });

        const result = await safeParseJSON(response);

        if (response.ok) {
            Swal.fire('Sucesso!', result.message, 'success');
            // ... lógica para limpar o formulário e atualizar a lista ...
        } else {
            Swal.fire('Erro!', result.message || 'Erro ao cadastrar produto.', 'error');
        }

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        Swal.fire('Erro!', 'Não foi possível se conectar ao servidor. Tente novamente mais tarde.', 'error');
    }
}
// Ações para o painel do cliente
// ...

// Ações para o painel do administrador
// ...