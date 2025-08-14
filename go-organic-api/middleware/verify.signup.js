const sql = require('mssql');
const config = require('../config/db.config');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const pool = await sql.connect(config);
    const { email } = req.body;

    const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length > 0) {
      return res.status(400).send({ message: "Falha! O e-mail já está em uso!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
    const { user_type } = req.body;
    if (user_type) {
        const ROLES = ["cliente", "vendedor", "admin"];
        if (!ROLES.includes(user_type)) {
            res.status(400).send({
                message: "Falha! O papel " + user_type + " não existe!"
            });
            return;
        }
    }
    next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};