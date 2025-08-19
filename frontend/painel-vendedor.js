// // painel-vendedor.js
// document.addEventListener("DOMContentLoaded", async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Acesso negado! Faça login como vendedor.");
//     window.location.href = "index.html";
//     return;
//   }

//   // Buscar produtos do vendedor
//   async function carregarProdutos() {
//     try {
//       const res = await fetch("/api/products/seller/me", {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       const produtos = await res.json();
//       const tabela = document.getElementById("tabela-produtos");
//       tabela.innerHTML = "";

//       produtos.forEach(prod => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//           <td>${prod.id}</td>
//           <td>${prod.name}</td>
//           <td>R$ ${prod.price}</td>
//           <td>
//             <button onclick="editarProduto(${prod.id})">Editar</button>
//             <button onclick="removerProduto(${prod.id})">Excluir</button>
//           </td>
//         `;
//         tabela.appendChild(row);
//       });
//     } catch (err) {
//       console.error("Erro ao carregar produtos:", err);
//     }
//   }

//   // Adicionar produto
//   document.getElementById("form-produto").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("produto-nome").value;
//     const price = document.getElementById("produto-preco").value;

//     try {
//       await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({ name, price })
//       });
//       alert("Produto adicionado!");
//       carregarProdutos();
//     } catch (err) {
//       console.error("Erro ao adicionar produto:", err);
//     }
//   });

//   window.removerProduto = async (id) => {
//     if (!confirm("Deseja excluir este produto?")) return;
//     try {
//       await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       carregarProdutos();
//     } catch (err) {
//       console.error("Erro ao remover produto:", err);
//     }
//   };

//   carregarProdutos();
// });
// painel-vendedor.js
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Acesso negado! Faça login como vendedor.");
    window.location.href = "index.html";
    return;
  }

  // Função para decodificar token JWT
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  // Verificar se o usuário é vendedor
  const decoded = parseJwt(token);
  if (!decoded || decoded.role !== "seller") {
    alert("Acesso negado! Esta área é exclusiva para vendedores.");
    window.location.href = "index.html";
    return;
  }

  // Buscar produtos do vendedor
  async function carregarProdutos() {
    try {
      const res = await fetch("/api/products/seller/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const produtos = await res.json();
      const tabela = document.getElementById("tabela-produtos");
      tabela.innerHTML = "";

      produtos.forEach(prod => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${prod.id}</td>
          <td>${prod.name}</td>
          <td>R$ ${prod.price}</td>
          <td>
            <button onclick="editarProduto(${prod.id})">Editar</button>
            <button onclick="removerProduto(${prod.id})">Excluir</button>
          </td>
        `;
        tabela.appendChild(row);
      });
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  }

  // Adicionar produto
  document.getElementById("form-produto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("produto-nome").value;
    const price = document.getElementById("produto-preco").value;

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, price })
      });
      alert("Produto adicionado!");
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  });

  window.removerProduto = async (id) => {
    if (!confirm("Deseja excluir este produto?")) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao remover produto:", err);
    }
  };

  carregarProdutos();
});
