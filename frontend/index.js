// index.js
document.addEventListener('DOMContentLoaded', () => {
    async function handleLogin(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // corrigido: pega do campo certo (user_typeLogin)
        data.user_type = (data.user_typeLogin || '').toLowerCase();

        try {
            const response = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.accessToken);
                localStorage.setItem('user_type', result.user_type);
                localStorage.setItem('user_name', result.name);
                localStorage.setItem('user_id', result.id);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Login bem-sucedido!',
                    text: 'Redirecionando...',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    redirectUser(result.user_type);
                });
            } else {
                Swal.fire('Erro!', `Falha no login: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            Swal.fire('Erro!', 'Não foi possível se conectar ao servidor.', 'error');
        }
    }

    async function handleSignup(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // corrigido: pega do campo certo (user_typeRegister)
        data.user_type = (data.user_typeRegister || '').toLowerCase();

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro bem-sucedido!',
                    text: 'Você será redirecionado para a página de login para entrar.',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    document.getElementById('registerModal').style.display = 'none';
                    document.getElementById('loginModal').style.display = 'block';
                });
            } else {
                Swal.fire('Erro!', `Falha no cadastro: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            Swal.fire('Erro!', 'Não foi possível se conectar ao servidor.', 'error');
        }
    }

    // Anexar listeners aos formulários
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('registerForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function redirectUser(user_type) {
    let redirectUrl;
    switch (user_type) {
        case 'cliente': redirectUrl = 'painel-cliente.html'; break;
        case 'vendedor': redirectUrl = 'painel-vendedor.html'; break;
        case 'admin': redirectUrl = 'painel-admin.html'; break;
        default: redirectUrl = 'index.html';
    }
    window.location.href = redirectUrl;
}
