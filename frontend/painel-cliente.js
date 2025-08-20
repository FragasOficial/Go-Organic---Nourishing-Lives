document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado!");
    window.location.href = "index.html";
    return;
  }

  // Função para buscar perfil
  async function carregarPerfil() {
    try {
      const res = await fetch("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Falha ao carregar perfil");

      const user = await res.json();
      document.getElementById("userName").textContent = user.name;
      document.getElementById("userEmail").textContent = user.email;
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar perfil");
    }
  }

  // Função para buscar pedidos
  async function carregarPedidos() {
    try {
      const res = await fetch("http://localhost:3000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Falha ao buscar pedidos");

      const pedidos = await res.json();
      const lista = document.getElementById("orderList");
      lista.innerHTML = "";

      if (pedidos.length === 0) {
        lista.innerHTML = "<p>Você ainda não tem pedidos.</p>";
        return;
      }

      pedidos.forEach((pedido) => {
        const item = document.createElement("div");
        item.classList.add("pedido");

        let produtosHtml = "";
        if (pedido.Products && pedido.Products.length > 0) {
          produtosHtml = pedido.Products.map(
            (p) =>
              `<li>${p.name} - R$ ${p.price} (Qtd: ${p.OrderProduct?.quantity || 1})</li>`
          ).join("");
        }

        item.innerHTML = `
          <h3>Pedido #${pedido.id}</h3>
          <p>Status: ${pedido.status}</p>
          <p>Data: ${new Date(pedido.createdAt).toLocaleDateString()}</p>
          <h4>Produtos:</h4>
          <ul>${produtosHtml}</ul>
          <hr>
        `;

        lista.appendChild(item);
      });
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
    }
  }

  // Executa as funções
  await carregarPerfil();
  await carregarPedidos();
});
