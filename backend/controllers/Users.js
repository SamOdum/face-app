// const uuidv4 = require('uuid/v4');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const db = require('../config/dbQuery');
const { Helper } = require('../middleware/Auth');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Users = {
  query: {
    createUser: `INSERT INTO
  users( name, email, password)
  VALUES ($1, $2, $3) returning *`,
    findUser: 'SELECT * FROM users WHERE email = $1',
    deleteUser: 'DELETE FROM users WHERE email = $1 returning *',
  },

  /**
   * Create User
   * @param {object} req
   * @param {object} res
   * @returns {object} User id and token
   */
  async create(req, res) {
    const { password1, password2 } = req.body;
    if(password1 !== password2 ) return res.status(400).json({ status: 'error', data: { message: 'passwords must match' } });
      
    const Hashedpassword = Helper.hashPassword(password1);
    const values = [req.body.name, req.body.email, Hashedpassword ];

    try {
      const { rows } = await db.query(Users.query.createUser, values);
      const user = rows[0].name;
      const token = Helper.generateToken(user);
      return res.status(201).json({
        status: 'success', data: { message: 'User account successfully created', token, user },
      });
    } catch (err) {
      return res.status(400).send({ status: 'error', error: { message: err } });
    }
  },

  /**
   * Delete User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const userId = req.body.userUniqueId;
    const findQuery = Employees.query.findUser;
    const deleteQuery = Employees.query.deleteUser;
    try {
      const { rows } = await db.query(findQuery, [userId]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', error: { message: 'User not found' } });
      }
      cloudinary.uploader.destroy(rows[0].publicid);
      const response = await db.query(deleteQuery, [userId]);
      if (!response.rows[0]) {
        return res.status(404).json({ status: 'error', error: { message: 'Employee not found' } });
      }
      return res.status(202).json({ status: 'success', data: { message: 'User successfully deleted' } });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Login User
   * @param {object} req
   * @param {object} res
   * @returns {object} user id and authentification token
   */
  async login(req, res) {
    const { email, password1 } = req.body;
    if (!email || !password1 || (!Helper.isValidEmail(email))) {
      return res.status(400).send({ status: 'error', error: { message: 'Fill all fields and provide a valid email' } });
    }
    try {
      const { rows } = await db.query(Users.query.findUser, [email]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', error: { message: 'The credentials you provided is incorrect' } });
      }
      if (!Helper.comparePassword(rows[0].password, password1)) {
        return res.status(400).send({ status: 'error', error: { message: 'The credentials you provided is incorrect' } });
      }
      const token = Helper.generateToken(rows[0].name);
      return res.status(200).send({ status: 'success', data: { token, user: rows[0].name } });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Users;
