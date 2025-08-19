// painel-cliente.js
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Acesso negado! Faça login como cliente.");
    window.location.href = "index.html";
    return;
  }

  // Buscar perfil do cliente
  try {
    const res = await fetch("/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Falha ao carregar perfil");
    const user = await res.json();
    document.getElementById("cliente-nome").textContent = user.name;
    document.getElementById("cliente-email").textContent = user.email;
  } catch (err) {
    console.error(err);
  }

  // Listar pedidos do cliente
  try {
    const res = await fetch("/api/orders/my-orders", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const pedidos = await res.json();
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    pedidos.forEach(pedido => {
      const li = document.createElement("li");
      li.textContent = `Pedido #${pedido.id} - Total: R$ ${pedido.total}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
  }
});
