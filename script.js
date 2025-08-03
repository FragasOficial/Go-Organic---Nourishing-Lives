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

// Cidades por estado (principais cidades)
const citiesByState = {
    "AC": [
        "Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá",
        "Feijó", "Brasiléia", "Senador Guiomard", "Plácido de Castro",
        "Xapuri", "Mâncio Lima", "Rodrigues Alves", "Porto Acre",
        "Epitaciolândia", "Marechal Thaumaturgo", "Porto Walter",
        "Capixaba", "Bujari", "Acrelândia", "Assis Brasil", "Manoel Urbano"
    ],
    "AL": [
        "Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo",
        "União dos Palmares", "Penedo", "São Miguel dos Campos", "Santana do Ipanema",
        "Delmiro Gouveia", "Campo Alegre", "Coruripe", "Teotônio Vilela",
        "Pilar", "São Luís do Quitunde", "Atalaia", "Marechal Deodoro",
        "Murici", "Matriz de Camaragibe", "Piranhas", "Boca da Mata"
    ],
    "AM": [
        "Manaus", "Parintins", "Itacoatiara", "Manacapuru",
        "Coari", "Tabatinga", "Maues", "Tefé",
        "Humaitá", "São Gabriel da Cachoeira", "Iranduba", "Manicoré",
        "Lábrea", "Borba", "Benjamin Constant", "Autazes",
        "Careiro", "Eirunepé", "Nova Olinda do Norte", "Presidente Figueiredo"
    ],
    "AP": [
        "Macapá", "Santana", "Laranjal do Jari", "Oiapoque",
        "Porto Grande", "Mazagão", "Tartarugalzinho", "Pedra Branca do Amapari",
        "Calçoene", "Amapá", "Ferreira Gomes", "Cutias",
        "Pracuúba", "Serra do Navio", "Itaubal", "Vitória do Jari",
        "Augusto Correa", "Cachoeira do Arari", "Curralinho", "São Sebastião da Boa Vista"
    ],
    "BA": [
        "Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari",
        "Itabuna", "Juazeiro", "Lauro de Freitas", "Ilhéus",
        "Jequié", "Barreiras", "Teixeira de Freitas", "Porto Seguro",
        "Alagoinhas", "Simões Filho", "Paulo Afonso", "Eunápolis",
        "Santo Antônio de Jesus", "Valença", "Candeias", "Guanambi"
    ],
    "CE": [
        "Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú",
        "Sobral", "Crato", "Itapipoca", "Maranguape",
        "Iguatu", "Quixadá", "Pacatuba", "Quixeramobim",
        "Aracati", "Canindé", "Crateús", "Aquiraz",
        "Russas", "Tianguá", "Cascavel", "Horizonte"
    ],
    "DF": [
        "Brasília", "Ceilândia", "Taguatinga", "Samambaia",
        "Planaltina", "Gama", "Santa Maria", "São Sebastião",
        "Recanto das Emas", "Sobradinho", "Guará", "Paranoá",
        "Águas Claras", "Riacho Fundo", "Núcleo Bandeirante", "Lago Sul",
        "Candangolândia", "Cruzeiro", "Varjão", "Sudoeste/Octogonal"
    ],
    "ES": [
        "Vitória", "Vila Velha", "Serra", "Cariacica",
        "Linhares", "São Mateus", "Guarapari", "Aracruz",
        "Colatina", "Cachoeiro de Itapemirim", "Viana", "Nova Venécia",
        "Barra de São Francisco", "Santa Maria de Jetibá", "Marataízes", "Domingos Martins",
        "Anchieta", "Itapemirim", "Conceição da Barra", "Afonso Cláudio"
    ],
    "GO": [
        "Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde",
        "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade",
        "Formosa", "Novo Gama", "Itumbiara", "Senador Canedo",
        "Catalão", "Jataí", "Planaltina", "Caldas Novas",
        "Santo Antônio do Descoberto", "Goianésia", "Mineiros", "Hidrolândia"
    ],
    "MA": [
        "São Luís", "Imperatriz", "São José de Ribamar", "Timon",
        "Caxias", "Codó", "Paço do Lumiar", "Açailândia",
        "Bacabal", "Santa Inês", "Barra do Corda", "Pinheiro",
        "Chapadinha", "Buriticupu", "Santa Luzia", "Coroatá",
        "Grajaú", "Itapecuru Mirim", "Balsas", "Barreirinhas"
    ],
    "MG": [
        "Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora",
        "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba",
        "Governador Valadares", "Ipatinga", "Sete Lagoas", "Divinópolis",
        "Santa Luzia", "Ibirité", "Poços de Caldas", "Patos de Minas",
        "Teófilo Otoni", "Pouso Alegre", "Barbacena", "Sabará"
    ],
    "MS": [
        "Campo Grande", "Dourados", "Três Lagoas", "Corumbá",
        "Ponta Porã", "Naviraí", "Nova Andradina", "Aquidauana",
        "Sidrolândia", "Paranaíba", "Maracaju", "Coxim",
        "Amambai", "Rio Brilhante", "Caarapó", "Miranda",
        "Bela Vista", "São Gabriel do Oeste", "Jardim", "Bataguassu"
    ],
    "MT": [
        "Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop",
        "Tangará da Serra", "Cáceres", "Sorriso", "Lucas do Rio Verde",
        "Primavera do Leste", "Barra do Garças", "Alta Floresta", "Pontes e Lacerda",
        "Juína", "Campo Verde", "Nova Mutum", "Campo Novo do Parecis",
        "Peixoto de Azevedo", "Guarantã do Norte", "Poconé", "Diamantino"
    ],
    "PA": [
        "Belém", "Ananindeua", "Santarém", "Marabá",
        "Parauapebas", "Castanhal", "Abaetetuba", "Itaituba",
        "Cametá", "Bragança", "São Félix do Xingu", "Barcarena",
        "Altamira", "Tucuruí", "Breves", "Tailândia",
        "Paragominas", "Redenção", "Moju", "Capanema"
    ],
    "PB": [
        "João Pessoa", "Campina Grande", "Santa Rita", "Patos",
        "Bayeux", "Sousa", "Cajazeiras", "Cabedelo",
        "Guarabira", "Sapé", "Mamanguape", "Monteiro",
        "Pombal", "Itabaiana", "Catolé do Rocha", "Esperança",
        "Queimadas", "Alagoa Grande", "Rio Tinto", "Bananeiras"
    ],
    "PE": [
        "Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru",
        "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe",
        "Garanhuns", "Vitória de Santo Antão", "Igarassu", "São Lourenço da Mata",
        "Abreu e Lima", "Santa Cruz do Capibaribe", "Ipojuca", "Serra Talhada",
        "Gravatá", "Araripina", "Goiana", "Belo Jardim"
    ],
    "PI": [
        "Teresina", "Parnaíba", "Picos", "Piripiri",
        "Floriano", "Campo Maior", "Barras", "União",
        "Altos", "Esperantina", "José de Freitas", "Oeiras",
        "Miguel Alves", "São Raimundo Nonato", "Corrente", "Pedro II",
        "Luís Correia", "Batalha", "Uruçuí", "Valença do Piauí"
    ],
    "PR": [
        "Curitiba", "Londrina", "Maringá", "Ponta Grossa",
        "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo",
        "Guarapuava", "Paranaguá", "Araucária", "Toledo",
        "Apucarana", "Pinhais", "Campo Largo", "Arapongas",
        "Almirante Tamandaré", "Umuarama", "Cambé", "Piraquara"
    ],
    "RJ": [
        "Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu",
        "Niterói", "Belford Roxo", "São João de Meriti", "Campos dos Goytacazes",
        "Petrópolis", "Volta Redonda", "Magé", "Itaboraí", "Macaé",
        "Mesquita", "Cabo Frio", "Queimados", "Angra dos Reis",
        "Nova Friburgo", "Barra Mansa", "Teresópolis"
    ],
    "RN": [
        "Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante",
        "Macaíba", "Ceará-Mirim", "Caicó", "Açu",
        "Currais Novos", "São José de Mipibu", "Santa Cruz", "Apodi",
        "João Câmara", "Touros", "Pau dos Ferros", "Nova Cruz",
        "Areia Branca", "Extremoz", "Monte Alegre", "Baraúna"
    ],
    "RO": [
        "Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena",
        "Cacoal", "Rolim de Moura", "Guajará-Mirim", "Jaru",
        "Ouro Preto do Oeste", "Pimenta Bueno", "Buritis", "Machadinho d'Oeste",
        "Espigão d'Oeste", "Alta Floresta d'Oeste", "Nova Mamoré", "Presidente Médici",
        "São Miguel do Guaporé", "Candeias do Jamari", "Alto Alegre dos Parecis", "Theobroma"
    ],
    "RR": [
        "Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre",
        "Mucajaí", "Cantá", "Bonfim", "Pacaraima",
        "Amajari", "Iracema", "Uiramutã", "Normandia",
        "São João da Baliza", "São Luiz", "Caroebe", "Cristalândia do Oeste",
        "Governador Jorge Teixeira", "Mirante da Serra", "Nova Brasilândia d'Oeste", "Vale do Anari"
    ],
    "RS": [
        "Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas",
        "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo",
        "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo",
        "Sapucaia do Sul", "Uruguaiana", "Bagé", "Bento Gonçalves",
        "Erechim", "Guaíba", "Santa Cruz do Sul", "Cachoeirinha"
    ],
    "SC": [
        "Florianópolis", "Joinville", "Blumenau", "São José",
        "Chapecó", "Itajaí", "Criciúma", "Lages",
        "Jaraguá do Sul", "Palhoça", "Balneário Camboriú", "Brusque",
        "Tubarão", "Rio do Sul", "Navegantes", "São Bento do Sul",
        "Concórdia", "Caçador", "Araranguá", "Içara"
    ],
    "SE": [
        "Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana",
        "São Cristóvão", "Estância", "Tobias Barreto", "Itaporanga d'Ajuda",
        "Simão Dias", "Poço Redondo", "Capela", "Propriá",
        "Porto da Folha", "Nossa Senhora da Glória", "Boquim", "Canindé de São Francisco",
        "Barra dos Coqueiros", "Riachão do Dantas", "Umbaúba", "Japaratuba"
    ],
    "SP": [
        "São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", 
        "Santo André", "Osasco", "São José dos Campos", "Ribeirão Preto",
        "Sorocaba", "Mauá", "São José do Rio Preto", "Santos", 
        "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba",
        "Piracicaba", "Bauru", "Itaquaquecetuba", "São Vicente"
    ],
    "TO": [
        "Palmas", "Araguaína", "Gurupi", "Porto Nacional",
        "Paraíso do Tocantins", "Araguatins", "Colinas do Tocantins", "Guaraí",
        "Tocantinópolis", "Dianópolis", "Formoso do Araguaia", "Miracema do Tocantins",
        "Augustinópolis", "Pedro Afonso", "Taguatinga", "Wanderlândia",
        "Xambioá", "Lagoa da Confusão", "Nova Olinda", "Peixe"
    ]
};
function populateStateFilter() {
    const stateFilter = document.getElementById('stateFilter');
    
    brazilianStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        stateFilter.appendChild(option);
    });
}

function populateCityFilter(state) {
    const cityFilter = document.getElementById('cityFilter');
    cityFilter.innerHTML = '<option value="">Todas as cidades</option>';
    
    if (!state) return;
    
    const cities = citiesByState[state] || [];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

// Array de produtos completo com informações nutricionais
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
        description: "Maçãs cultivadas sem agrotóxicos, colhidas no ponto ideal de maturação.",
        nutrition: {
            portion: "100g",
            calories: "52 kcal",
            carbs: "14g",
            proteins: "0.3g",
            fats: "0.2g",
            fibers: "2.4g",
            vitamins: "Vitamina C, K"
        }
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
        description: "Bananas cultivadas com adubação orgânica e sem pesticidas químicos.",
        nutrition: {
            portion: "100g",
            calories: "89 kcal",
            carbs: "23g",
            proteins: "1.1g",
            fats: "0.3g",
            fibers: "2.6g",
            vitamins: "Vitamina B6, C"
        }
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
        description: "Arroz integral cultivado de forma sustentável, rico em fibras e nutrientes.",
        nutrition: {
            portion: "100g cozido",
            calories: "111 kcal",
            carbs: "23g",
            proteins: "2.6g",
            fats: "0.9g",
            fibers: "1.8g",
            vitamins: "Vitamina B1, B3"
        }
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
        description: "Mel puro produzido por abelhas em áreas de floresta nativa.",
        nutrition: {
            portion: "20g (1 colher)",
            calories: "64 kcal",
            carbs: "17g",
            proteins: "0.1g",
            fats: "0g",
            fibers: "0g",
            vitamins: "Antioxidantes"
        }
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
        description: "Café cultivado em sistema agroflorestal, com torra média para melhor sabor.",
        nutrition: {
            portion: "100ml (1 xícara)",
            calories: "2 kcal",
            carbs: "0g",
            proteins: "0.3g",
            fats: "0g",
            fibers: "0g",
            vitamins: "Vitamina B2, B3"
        }
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
        description: "Ovos de galinhas criadas soltas, alimentadas com ração orgânica.",
        nutrition: {
            portion: "1 ovo (50g)",
            calories: "70 kcal",
            carbs: "0.6g",
            proteins: "6g",
            fats: "5g",
            fibers: "0g",
            vitamins: "Vitamina A, D, B12"
        }
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
        description: "Tomates cultivados sem agrotóxicos, colhidos diariamente.",
        nutrition: {
            portion: "100g",
            calories: "18 kcal",
            carbs: "3.9g",
            proteins: "0.9g",
            fats: "0.2g",
            fibers: "1.2g",
            vitamins: "Vitamina C, K"
        }
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
        description: "Azeite extra virgem prensado a frio, de olivas cultivadas organicamente.",
        nutrition: {
            portion: "15ml (1 colher)",
            calories: "120 kcal",
            carbs: "0g",
            proteins: "0g",
            fats: "14g",
            fibers: "0g",
            vitamins: "Vitamina E, K"
        }
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
        description: "Chá verde cultivado em montanhas, rico em antioxidantes.",
        nutrition: {
            portion: "240ml (1 xícara)",
            calories: "2 kcal",
            carbs: "0g",
            proteins: "0g",
            fats: "0g",
            fibers: "0g",
            vitamins: "Antioxidantes"
        }
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
        description: "Sabonetes artesanais feitos com óleos vegetais e essências naturais.",
        nutrition: null // Sem informações nutricionais para produtos não alimentícios
    }
];

// Estado da aplicação
let cart = [];
let cartCount = 0;
let selectedState = '';
let selectedCity = '';
let isMobileView = window.innerWidth <= 768;
let currentChatProduct = null;
let chatMessages = JSON.parse(localStorage.getItem('goOrganicChatMessages')) || {};
let headerExpanded = true;

// Elementos do DOM
const elements = {
    productsGrid: document.getElementById('productsGrid'),
    searchInput: document.getElementById('searchInput'),
    searchButton: document.getElementById('searchButton'),
    stateFilter: document.getElementById('stateFilter'),
    cityFilter: document.getElementById('cityFilter'),
    loginBtn: document.getElementById('loginBtn'),
    registerBtn: document.getElementById('registerBtn'),
    cartBtn: document.getElementById('cartBtn'),
    cartCountElement: document.getElementById('cartCount'),
    loginModal: document.getElementById('loginModal'),
    registerModal: document.getElementById('registerModal'),
    cartModal: document.getElementById('cartModal'),
    closeButtons: document.querySelectorAll('.close'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    clientType: document.getElementById('clientType'),
    sellerType: document.getElementById('sellerType'),
    sellerFields: document.getElementById('sellerFields'),
    chatModal: document.getElementById('chatModal'),
    chatMessages: document.getElementById('chatMessages'),
    sendMessageBtn: document.getElementById('sendMessageBtn'),
    chatMessageInput: document.getElementById('chatMessageInput'),
    chatSellerName: document.getElementById('chatSellerName'),
    chatProductInfo: document.getElementById('chatProductInfo')
};

// Funções de Utilidade
function setupRegionModal() {
    const modal = document.getElementById('regionConfirmModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function checkMobileView() {
    isMobileView = window.innerWidth <= 768;
}

function showFilters() {
    if (!isMobileView) return;
    document.querySelector('.filters').classList.add('active');
    document.querySelector('.user-actions')?.classList.remove('active');
}

function showUserActions() {
    if (!isMobileView) return;
    document.querySelector('.user-actions').classList.add('active');
    document.querySelector('.filters')?.classList.remove('active');
}

// Funções de Filtro e Pesquisa
function updateCities() {
    const state = elements.stateFilter.value;
    populateCityFilter(state);
    
    if (isMobileView) showUserActions();
}

function filterProducts() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    const selectedState = elements.stateFilter.value;
    const selectedCity = elements.cityFilter.value;
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm) ||
                            product.seller.toLowerCase().includes(searchTerm);
        const matchesState = selectedState ? product.state === selectedState : true;
        const matchesCity = selectedCity ? product.city === selectedCity : true;
        
        return matchesSearch && matchesState && matchesCity;
    });
    
        renderProducts(filteredProducts);
        checkShowUserActions(); // Adicione esta linha
}

// Funções de Renderização
function renderProducts(productsToRender) {
    elements.productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        elements.productsGrid.innerHTML = '<p class="no-products">Nenhum produto encontrado</p>';
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
                
                ${product.nutrition ? `
                <div class="nutrition-section">
                    <a href="#" class="toggle-nutrition" data-id="${product.id}">
                        <i class="fas fa-utensils"></i> Informações Nutricionais
                    </a>
                    <div class="nutrition-info" id="nutrition-${product.id}" style="display: none;">
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span class="nutrition-label">Porção:</span>
                                <span class="nutrition-value">${product.nutrition.portion}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Calorias:</span>
                                <span class="nutrition-value">${product.nutrition.calories}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Carboidratos:</span>
                                <span class="nutrition-value">${product.nutrition.carbs}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Proteínas:</span>
                                <span class="nutrition-value">${product.nutrition.proteins}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Gorduras:</span>
                                <span class="nutrition-value">${product.nutrition.fats}</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Fibras:</span>
                                <span class="nutrition-value">${product.nutrition.fibers}</span>
                            </div>
                            <div class="nutrition-item full-width">
                                <span class="nutrition-label">Vitaminas:</span>
                                <span class="nutrition-value">${product.nutrition.vitamins}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ` : ''}
                
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
        
        elements.productsGrid.appendChild(productCard);
    });
    
    addProductEvents();
}

function addProductEvents() {
    // Eventos de quantidade
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    // Eventos de carrinho
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            showRegionConfirmModal(product, productId);
        });
    });
        
    // Eventos de contato
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', openWhatsApp);
    });
    
    document.querySelectorAll('.chat-btn').forEach(btn => {
        btn.addEventListener('click', openChat);
    });
    
    // Eventos de informações nutricionais
    document.querySelectorAll('.toggle-nutrition').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            const nutritionInfo = document.getElementById(`nutrition-${productId}`);
            
            if (nutritionInfo.style.display === 'none') {
                nutritionInfo.style.display = 'block';
                this.innerHTML = '<i class="fas fa-utensils"></i> Ocultar Informações';
            } else {
                nutritionInfo.style.display = 'none';
                this.innerHTML = '<i class="fas fa-utensils"></i> Informações Nutricionais';
            }
        });
    });
}

// Funções do Carrinho
function addToCartConfirmed(productId) {
    const product = products.find(p => p.id === productId);
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    const quantity = parseInt(quantityElement.textContent);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    cartCount += quantity;
    elements.cartCountElement.textContent = cartCount;
    quantityElement.textContent = '1';
    checkShowUserActions(); // Adicione esta linha
    
    // Feedback visual
    const addButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    addButton.textContent = 'Adicionado!';
    setTimeout(() => addButton.textContent = 'Adicionar', 1000);
}

function renderCart() {
    elements.cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        elements.cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        elements.cartTotal.textContent = 'R$ 0,00';
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
        
        elements.cartItems.appendChild(cartItemElement);
    });
    
    elements.cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Eventos de remoção
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cartCount -= cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        elements.cartCountElement.textContent = cartCount;
        renderCart();
        checkShowUserActions(); // Adicione esta linha
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    alert('Compra finalizada com sucesso! Obrigado por comprar na Go Organic.');
    cart = [];
    cartCount = 0;
    elements.cartCountElement.textContent = '0';
    checkShowUserActions(); // Adicione esta linha
    elements.cartModal.style.display = 'none';
    renderCart();
}

// Funções de Controle de Quantidade
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    let quantity = parseInt(quantityElement.textContent);
    
    quantity++;
    quantityElement.textContent = quantity;
}

// Funções de Contato
function openWhatsApp(e) {
    e.preventDefault();
    const phone = e.target.getAttribute('data-phone');
    const productName = e.target.closest('.product-card').querySelector('.product-title').textContent;
    const seller = e.target.getAttribute('data-seller');
    
    const message = `Olá ${seller}, estou interessado(a) no produto ${productName} que vi no Go Organic. Poderia me fornecer mais informações?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Funções do Chat
function saveChatMessages() {
    localStorage.setItem('goOrganicChatMessages', JSON.stringify(chatMessages));
}

function renderChatMessages(productId) {
    elements.chatMessages.innerHTML = '';
    
    if (chatMessages[productId]) {
        chatMessages[productId].forEach((msg, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'seller' ? 'received' : 'sent'} ${index === chatMessages[productId].length - 1 ? 'new-message' : ''}`;
            messageDiv.innerHTML = `
                <div>${msg.text}</div>
                <div class="message-time">${msg.time} - ${msg.sender === 'seller' ? currentChatProduct.seller : 'Você'}</div>
            `;
            elements.chatMessages.appendChild(messageDiv);
        });
    }
    
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function sendMessage() {
    const message = elements.chatMessageInput.value.trim();
    
    if (message && currentChatProduct) {
        const productId = currentChatProduct.id;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (!chatMessages[productId]) {
            chatMessages[productId] = [];
        }
        
        chatMessages[productId].push({
            text: message,
            sender: 'user',
            time: time
        });
        
        saveChatMessages();
        renderChatMessages(productId);
        elements.chatMessageInput.value = '';
        
        // Simula resposta do vendedor
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

function openChat(e) {
    e.preventDefault();
    const productId = e.target.getAttribute('data-id');
    const seller = e.target.getAttribute('data-seller');
    const product = products.find(p => p.id === parseInt(productId));
    
    currentChatProduct = product;
    
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
    
    elements.chatSellerName.textContent = seller;
    elements.chatProductInfo.textContent = `Produto: ${product.name} - R$ ${product.price.toFixed(2)}`;
    
    renderChatMessages(productId);
    elements.chatModal.style.display = 'block';
    elements.chatMessageInput.focus();
    
    // Remove notificação de nova mensagem
    e.target.classList.remove('has-new-message');
}

function initChatSystem() {
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

// Funções de Região
function checkProductRegion(product) {
    if (!isMobileView) return true;
    
    if (!selectedState || !selectedCity) {
        showRegionConfirmModal(product);
        return false;
    }
    
    return product.state === selectedState && product.city === selectedCity;
}

function checkShowUserActions() {
    const userActions = document.querySelector('.user-actions');
    if (isMobileView) {
        if (cartCount > 0 || elements.searchInput.value.trim() !== '' || 
            elements.stateFilter.value !== '' || elements.cityFilter.value !== '') {
            userActions.classList.add('force-show');
        } else {
            userActions.classList.remove('force-show');
        }
    }
}

function showRegionConfirmModal(product, productId) {
    const modal = document.getElementById('regionConfirmModal');
    const confirmText = document.getElementById('regionConfirmText');
    const confirmBtn = document.getElementById('confirmSameRegion');
    const searchBtn = document.getElementById('searchOtherRegion');
    
    confirmText.textContent = `O produto "${product.name}" está disponível em ${product.city}, ${product.state}. Deseja:`;
    
    // Remove event listeners anteriores para evitar duplicação
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    searchBtn.replaceWith(searchBtn.cloneNode(true));
    
    // Obtém novas referências após clonar
    const newConfirmBtn = document.getElementById('confirmSameRegion');
    const newSearchBtn = document.getElementById('searchOtherRegion');
    
    newConfirmBtn.addEventListener('click', () => {
        // Define a região do produto como filtro atual
        selectedState = product.state;
        selectedCity = product.city;
        elements.stateFilter.value = selectedState;
        populateCityFilter(selectedState);
        elements.cityFilter.value = selectedCity;
        
        // Fecha o modal e adiciona ao carrinho
        modal.style.display = 'none';
        addToCartConfirmed(productId);
    });
    
    newSearchBtn.addEventListener('click', () => {
        // Define o nome do produto como termo de pesquisa
        elements.searchInput.value = product.name;
        elements.searchInput.focus();
        
        // Mostra os filtros (para mobile)
        if (isMobileView) {
            document.querySelector('.filters').classList.add('active');
            document.querySelector('.user-actions')?.classList.remove('active');
        }
        
        // Fecha o modal
        modal.style.display = 'none';
        
        // Mostra o filtro de estado após a pesquisa
        document.querySelector('.filters').style.display = 'flex';
        elements.stateFilter.style.display = 'block';
        elements.cityFilter.style.display = 'none';
        
        // Filtra os produtos
        filterProducts();
    });
    
    modal.style.display = 'block';
}

// Add event listeners for the search flow
elements.searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        // Show state filter when typing in search
        document.querySelector('.filters').style.display = 'flex';
        elements.stateFilter.style.display = 'block';
        elements.cityFilter.style.display = 'none';
    } else {
        // Hide both filters when search is empty
        document.querySelector('.filters').style.display = 'none';
    }
    filterProducts();
});

elements.stateFilter.addEventListener('change', function() {
    selectedState = this.value;
    if (selectedState) {
        // Show city filter when state is selected
        elements.cityFilter.style.display = 'block';
        updateCities();
    } else {
        // Hide city filter if no state is selected
        elements.cityFilter.style.display = 'none';
    }
    filterProducts();
});

elements.cityFilter.addEventListener('change', function() {
    selectedCity = this.value;
    filterProducts();
    if (isMobileView && this.value) showUserActions();
});

// Funções de Scroll e Header
function handleScroll() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    const productsGrid = elements.productsGrid;
    
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

// Funções de Autenticação e Cadastro
function setupAuthForms() {
    // Preenche o select de estados no formulário de cadastro
    const registerStateSelect = document.getElementById('registerState');
    registerStateSelect.innerHTML = '<option value="">Selecione</option>';
    
    brazilianStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        registerStateSelect.appendChild(option);
    });
    // Mostrar/ocultar campos de vendedor
    elements.clientType.addEventListener('change', function() {
        if(this.checked) {
            elements.sellerFields.style.display = 'none';
        }
    });

    elements.sellerType.addEventListener('change', function() {
        if(this.checked) {
            elements.sellerFields.style.display = 'block';
        }
    });

    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        alert(`Login realizado com o email: ${email}`);
        elements.loginModal.style.display = 'none';
        elements.loginForm.reset();
    });

    elements.registerForm.addEventListener('submit', (e) => {
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
        
        alert(`Cadastro de ${userType === 'client' ? 'Cliente' : 'Vendedor'} realizado com sucesso!\nNome: ${name}\nEmail: ${email}`);
        elements.registerModal.style.display = 'none';
        elements.registerForm.reset();
        elements.sellerFields.style.display = 'none';
        elements.clientType.checked = true;
        
        filterProducts();
    });
}

// Configuração de Event Listeners
function setupEventListeners() {
    // Pesquisa e filtros
    elements.searchInput.addEventListener('input', function() {
        filterProducts();
        if (isMobileView && this.value.length > 0) showFilters();
    });
    
    elements.searchButton.addEventListener('click', filterProducts);
    elements.stateFilter.addEventListener('change', function() {
        selectedState = this.value;
        updateCities();
        filterProducts();
    });
    
    elements.cityFilter.addEventListener('change', function() {
        selectedCity = this.value;
        filterProducts();
        if (isMobileView && this.value) showUserActions();
    });
    
    // Modais
    elements.loginBtn.addEventListener('click', () => {
        elements.loginModal.style.display = 'block';
    });

    elements.registerBtn.addEventListener('click', () => {
        elements.registerModal.style.display = 'block';
    });

    elements.cartBtn.addEventListener('click', () => {
        renderCart();
        elements.cartModal.style.display = 'block';
    });

    elements.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.loginModal.style.display = 'none';
            elements.registerModal.style.display = 'none';
            elements.cartModal.style.display = 'none';
            elements.chatModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) {
            elements.loginModal.style.display = 'none';
        }
        if (e.target === elements.registerModal) {
            elements.registerModal.style.display = 'none';
        }
        if (e.target === elements.cartModal) {
            elements.cartModal.style.display = 'none';
        }
        if (e.target === elements.chatModal) {
            elements.chatModal.style.display = 'none';
        }
    });
    
    // Chat
    elements.sendMessageBtn.addEventListener('click', sendMessage);
    elements.chatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Checkout
    elements.checkoutBtn.addEventListener('click', checkout);
    
    // Redimensionamento
    window.addEventListener('resize', function() {
        checkMobileView();
        if (!isMobileView) {
            document.querySelector('.filters')?.classList.remove('active');
            document.querySelector('.user-actions')?.classList.remove('active');
        }
    });
}

// Inicialização
function init() {
    checkMobileView();
    populateStateFilter();
    renderProducts(products);
    setupAuthForms();
    setupEventListeners();
    initChatSystem();
    updateCities();
    checkShowUserActions();
    
    // Initially hide the filters
    document.querySelector('.filters').style.display = 'none';
    elements.stateFilter.style.display = 'none';
    elements.cityFilter.style.display = 'none';
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                const header = document.querySelector('.header');
                header.classList.remove('scrolled');
                headerExpanded = true;
            }
        });
    });
    
    observer.observe(elements.productsGrid, { childList: true });
    window.addEventListener('scroll', handleScroll);
}
document.addEventListener('DOMContentLoaded', init);