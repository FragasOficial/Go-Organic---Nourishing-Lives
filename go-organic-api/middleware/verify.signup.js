const sql = require("mssql");
const config = require("../config/db.config");
const { ROLES } = require("../config/roles.config");

// Verifica se já existe email no banco
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    console.log("📩 [verify.signup] Body recebido:", req.body);

    const pool = await sql.connect(config);
    const { email } = req.body;

    if (!email) {
      console.warn("⚠️ Nenhum email recebido no body!");
      return res.status(400).send({ message: "Email é obrigatório." });
    }

    console.log("🔎 [verify.signup] Verificando email:", email);

    const query = "SELECT * FROM Users WHERE email = @email";
    console.log("📝 [verify.signup] Executando query:", query);

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(query);

    console.log("📊 [verify.signup] Resultado da query:", result.recordset);

    if (result.recordset.length > 0) {
      console.warn("🚫 [verify.signup] Email já em uso!");
      return res
        .status(400)
        .send({ message: "Falha! O e-mail já está em uso!" });
    }

    next();
  } catch (err) {
    console.error("❌ [verify.signup] Erro:", err);
    res.status(500).send({ message: err.message });
  }
};

// Valida se o user_type existe (case insensitive)
const checkRolesExisted = (req, res, next) => {
  const { user_type } = req.body;
  console.log("🛂 [verify.signup] Verificando user_type:", user_type);

  if (user_type && !ROLES.includes(user_type.toLowerCase())) {
    console.warn("🚫 [verify.signup] Papel inválido:", user_type);
    return res.status(400).send({
      message: `Falha! O papel '${user_type}' não existe! Valores aceitos: ${ROLES.join(
        ", "
      )}`
    });
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
