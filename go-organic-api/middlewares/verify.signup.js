const { poolPromise } = require('../config/db.config');
const sql = require('mssql');

exports.checkDuplicateEmail = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, req.body.email)
      .query('SELECT id FROM Users WHERE email = @email');
    
    if (result.recordset.length > 0) {
      return res.status(400).send({ message: "Email já está em uso!" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.checkRolesExisted = (req, res, next) => {
  const validRoles = ['client', 'seller', 'admin'];
  if (req.body.user_type && !validRoles.includes(req.body.user_type)) {
    return res.status(400).send({
      message: `Tipo de usuário inválido! Use: ${validRoles.join(', ')}`
    });
  }
  next();
};