document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch("http://localhost:3000/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log("🔑 Resposta do login:", data);

        if (res.ok && data.accessToken) {
          // Salva o token JWT
          localStorage.setItem("token", data.accessToken);

          // Salva dados básicos do usuário
          localStorage.setItem("user_id", data.id);
          localStorage.setItem("user_name", data.name || data.username);
          localStorage.setItem("user_type", data.user_type || data.role); // compatível

          // Salva o objeto inteiro (se precisar em outras páginas)
          localStorage.setItem("user", JSON.stringify(data));

          Swal.fire("Bem-vindo!", "Login realizado com sucesso.", "success").then(() => {
            const tipo = data.user_type || data.role;

            if (tipo === "vendedor") {
              window.location.href = "painel-vendedor.html";
            } else if (tipo === "admin") {
              window.location.href = "painel-admin.html";
            } else {
              window.location.href = "painel-cliente.html";
            }
          });
        } else {
          Swal.fire("Erro!", data.message || "Falha no login", "error");
        }
      } catch (err) {
        console.error("Erro no login:", err);
        Swal.fire("Erro!", "Erro ao conectar com o servidor", "error");
      }
    });
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_type");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
