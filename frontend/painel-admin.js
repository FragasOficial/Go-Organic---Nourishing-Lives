// painel-admin.js
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Acesso negado! Faça login como administrador.");
    window.location.href = "index.html";
    return;
  }

  // Listar usuários
  async function carregarUsuarios() {
    try {
      const res = await fetch("/api/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const usuarios = await res.json();
      const tabela = document.getElementById("tabela-usuarios");
      tabela.innerHTML = "";

      usuarios.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="banirUsuario(${user.id})">Banir</button>
          </td>
        `;
        tabela.appendChild(row);
      });
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  }

  // Banir usuário
  window.banirUsuario = async (id) => {
    if (!confirm("Deseja banir este usuário?")) return;
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      carregarUsuarios();
    } catch (err) {
      console.error("Erro ao banir usuário:", err);
    }
  };

  // Listar produtos
  async function carregarProdutos() {
    try {
      const res = await fetch("/api/products", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const produtos = await res.json();
      const tabela = document.getElementById("tabela-produtos-admin");
      tabela.innerHTML = "";

      produtos.forEach(prod => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${prod.id}</td>
          <td>${prod.name}</td>
          <td>R$ ${prod.price}</td>
          <td>${prod.sellerId}</td>
          <td>
            <button onclick="removerProdutoAdmin(${prod.id})">Excluir</button>
          </td>
        `;
        tabela.appendChild(row);
      });
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  }

  window.removerProdutoAdmin = async (id) => {
    if (!confirm("Deseja excluir este produto?")) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  };

  carregarUsuarios();
  carregarProdutos();
});
