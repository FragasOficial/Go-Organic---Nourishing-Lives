const { poolPromise } = require('../config/db.config');

const User = {
  async create(user) {
    const { name, email, password, user_type, state, city, phone, business_name, cnpj, description } = user;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .input('user_type', sql.NVarChar, user_type)
      .input('state', sql.NVarChar, state)
      .input('city', sql.NVarChar, city)
      .input('phone', sql.NVarChar, phone)
      .input('business_name', sql.NVarChar, business_name || null)
      .input('cnpj', sql.NVarChar, cnpj || null)
      .input('description', sql.NVarChar, description || null)
      .query(`INSERT INTO Users (name, email, password, user_type, state, city, phone, business_name, cnpj, description) 
              VALUES (@name, @email, @password, @user_type, @state, @city, @phone, @business_name, @cnpj, @description);
              SELECT SCOPE_IDENTITY() AS id;`);
    
    return result.recordset[0].id;
  },

  async findByEmail(email) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    
    return result.recordset[0];
  },

  async findById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users WHERE id = @id');
    
    return result.recordset[0];
  },

  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT id, name, email, user_type, state, city, phone, business_name, cnpj, description FROM Users');
    
    return result.recordset;
  },

  async update(id, updates) {
    const pool = await poolPromise;
    let query = 'UPDATE Users SET ';
    const inputs = [];
    
    Object.keys(updates).forEach((key, index) => {
      query += `${key} = @${key}${index < Object.keys(updates).length - 1 ? ', ' : ''}`;
      inputs.push({ name: `${key}`, type: sql.NVarChar, value: updates[key] });
    });
    
    query += ' WHERE id = @id';
    inputs.push({ name: 'id', type: sql.Int, value: id });
    
    const request = pool.request();
    inputs.forEach(input => request.input(input.name, input.type, input.value));
    
    await request.query(query);
    return this.findById(id);
  },

  async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE id = @id');
  }
};

module.exports = User;