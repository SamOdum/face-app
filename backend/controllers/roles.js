const db = require('../config/dbQuery');

const Roles = {
  /**
   * Create Roles
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const text = `INSERT INTO
      roles(rolename)
      VALUES($1)
      returning *`;

    const values = [
      req.body.roleName,
    ];
    // console.log(values);

    try {
      const { rows } = await db.query(text, values);
      const { rolename } = rows[0];
      console.log(rows[0]);
      return res.status(201).json({
        status: 'success',
        data: {
          message: `The ${rolename} role has been successfully created`,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Roles;
