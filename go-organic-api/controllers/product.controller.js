const Product = require('../models/product.model');
const User = require('../models/user.model'); // Adicione esta linha para importar o modelo de usuário

exports.createProduct = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: "É necessário estar autenticado para cadastrar um produto." });
    }

    const seller_id = req.userId;

    // 🐛 SOLUÇÃO: Busque as informações do vendedor para obter o estado
    const seller = await User.findById(seller_id);
    if (!seller) {
      return res.status(404).send({ message: "Vendedor não encontrado." });
    }

    const { name, description, price, image, city, category_id, available_quantity, unit_of_measure } = req.body;

    const productId = await Product.create({
      seller_id,
      name,
      description,
      price,
      image_url: image,
      // 🐛 SOLUÇÃO: Mapeie o estado, cidade e outras informações do vendedor/produto
      state: seller.state,
      city: city,
      category_id: category_id,
      available_quantity: available_quantity,
      unit_of_measure: unit_of_measure
    });

    res.status(201).send({ message: "Produto cadastrado com sucesso!", productId });
  } catch (err) {
    console.error('Erro no controller ao cadastrar produto:', err);
    res.status(500).send({ message: err.message });
  }
};