const config = require('../config.json');
const pool = require('../db/postgres');
const logger = require('../services/logger')(module);

module.exports = {
  get,
  getAll,
  update,
  del,
};

// const company = {
//   id: config.company_id,
//   contactId: config.contact_id,
//   name: 'ООО Фирма «Перспективные захоронения»',
//   shortName: 'Перспективные захоронения',
//   businessEntity: 'ООО',
//   contract: {
//     no: '12345',
//     issue_date: '2015-03-12T00:00:00Z',
//   },
//   type: ['agent', 'contractor'],
//   status: 'active',
//   createdAt: '2020-11-21T08:03:00Z',
//   updatedAt: '2020-11-23T09:30:00Z',
// };

async function get(req, res) {
  try {
    const URL = _getCurrentURL(req);
    const { id } = req.params;
    const company = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    company.photos = [{
      name: '0b8fc462dcabf7610a91.png',
      filepath: `${URL}0b8fc462dcabf7610a91.png`,
      thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
    }];
    return res.status(200).json(company.rows[0]);
  } catch (e) {
    logger.error('Server Error');
    return res.status(500).send('Server Error');
  }
}

async function getAll(req, res) {
  let {
    // eslint-disable-next-line prefer-const
    status, type, limit, page, order,
  } = req.query;
  page = page || 1;
  limit = limit || 4;
  order = order || 'id';
  const offset = page * limit - limit;
  let companies = [];

  if (!status && !type) {
    companies = await pool.query(`SELECT * FROM companies ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`);
  }
  if (status && !type) {
    companies = await pool.query(`SELECT * FROM companies WHERE status = $1 ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, [status]);
  }
  if (!status && type) {
    companies = await pool.query(`SELECT * FROM companies WHERE (type[1] = $1 OR type[2] = $1) ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, [type]);
  }

  if (status && type) {
    companies = await pool.query(`SELECT * FROM companies WHERE ((type[1] = $1 OR type[2] = $1) AND status = $2) ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`, [type, status]);
  }
  return res.status(200).json(companies.rows);
}

async function update(req, res) {
  try {
    const requestBody = req.body;
    const { id } = req.params;
    const company = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    // Логика для формирования универсального SQL запроса
    const newKeys = ['id', ...Object.keys(requestBody)];
    const newValues = [id, ...Object.values(requestBody)];
    const count = newValues.length;
    const valuesVar = [];
    for (let i = 1; i <= count; i += 1) {
      valuesVar.push(`$${i}`);
    }
    const text = `INSERT INTO companies(${newKeys}) VALUES(${valuesVar}) RETURNING *`;
    if (!company.rows[0]) {
      const newCompany = await pool.query(text, newValues);
      newCompany.rows[0].createdat = new Date();
      return res.status(200).json('New company created');
    }
    /* Если даты создания и обновления не переданы в теле запроса
    корректируем количество переменных для валидного запроса */
    if (!requestBody.updatedat) valuesVar.push(`$${valuesVar.length + 1}`);
    if (!requestBody.createdat) valuesVar.push(`$${valuesVar.length + 1}`);
    const URL = _getCurrentURL(req);
    requestBody.updatedat = new Date();
    requestBody.createdat = company.rows[0].createdat;
    const updatedKeys = Object.keys(requestBody);
    const updatedValues = Object.values(requestBody);
    valuesVar.pop();
    const sql = `UPDATE companies SET (${updatedKeys}) = (${valuesVar}) WHERE id = $${valuesVar.length + 1} RETURNING *`;
    updatedValues.push(id);
    const updatedCompany = await pool.query(sql, updatedValues);
    updatedCompany.rows[0].photos = [{
      name: '0b8fc462dcabf7610a91.png',
      filepath: `${URL}0b8fc462dcabf7610a91.png`,
      thumbpath: `${URL}0b8fc462dcabf7610a91_160x160.png`,
    }];
    return res.status(200).json('Company updated');
  } catch (e) {
    logger.error('Server Error:');
    return res.status(500).send('Server Error');
  }
}

async function del(req, res) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM companies WHERE id = $1', [id]);
    return res.status(200).send('Company deleted');
  } catch (e) {
    logger.error('Server Error:');
    return res.status(500).send('Server Error');
  }
}

function _getCurrentURL(req) {
  const { port } = config;
  return `${req.protocol}://${req.hostname}${port === '80' || port === '443' ? '' : `:${port}`}/`;
}
