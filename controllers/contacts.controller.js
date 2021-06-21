const logger = require('../services/logger')(module);
const pool = require('../db/postgres');

module.exports = {
  get,
  update,
  del,
};

// const contact = {
//   id: config.contact_id,
//   lastname: 'Григорьев',
//   firstname: 'Сергей',
//   patronymic: 'Петрович',
//   phone: '79162165588',
//   email: 'grigoriev@funeral.com',
//   createdAt: '2020-11-21T08:03:26.589Z',
//   updatedAt: '2020-11-23T09:30:00Z',
// };

async function get(req, res) {
  try {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return res.status(200).json(contact);
  } catch (e) {
    logger.error('Server Error');
    return res.status(500).send('Server Error');
  }
}

async function update(req, res) {
  try {
    const requestBody = req.body;
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    // Логика для формирования универсального SQL запроса
    const newKeys = ['id', ...Object.keys(requestBody)];
    const newValues = [id, ...Object.values(requestBody)];
    const count = newValues.length;
    const valuesVar = [];
    for (let i = 1; i <= count; i += 1) {
      valuesVar.push(`$${i}`);
    }
    const text = `INSERT INTO contacts(${newKeys}) VALUES(${valuesVar}) RETURNING *`;
    if (!contact.rows[0]) {
      const newContact = await pool.query(text, newValues);
      newContact.rows[0].createdat = new Date();
      return res.status(200).json('New contact created');
    }
    /* Если даты создания и обновления не переданы в теле запроса
    корректируем количество переменных для валидного запроса */
    if (!requestBody.updatedat) valuesVar.push(`$${valuesVar.length + 1}`);
    if (!requestBody.createdat) valuesVar.push(`$${valuesVar.length + 1}`);
    requestBody.updatedat = new Date();
    requestBody.createdat = contact.rows[0].createdat;
    const updatedKeys = Object.keys(requestBody);
    const updatedValues = Object.values(requestBody);
    valuesVar.pop();
    const sql = `UPDATE contacts SET (${updatedKeys}) = (${valuesVar}) WHERE id = $${valuesVar.length + 1} RETURNING *`;
    // return res.status(200).json(sql);
    updatedValues.push(id);
    await pool.query(sql, updatedValues);
    return res.status(200).json('Contact updated');
  } catch (e) {
    // logger.error('Server Error:');
    logger.error(e);
    return res.status(500).send('Server Error');
  }
}

async function del(req, res) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    return res.status(200).send('Contact deleted');
  } catch (e) {
    logger.error('Server Error:');
    return res.status(500).send('Server Error');
  }
}
