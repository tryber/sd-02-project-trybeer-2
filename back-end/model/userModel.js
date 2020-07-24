const connection = require('./connection');

const getUserByEmail = async (param) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT u.id, u.name, u.email, u.password, u.role
    FROM users AS u
    WHERE u.email = ?;`,
  )
    .bind(param)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;
  const [id, name, email, password, role] = result;

  return { id, name, email, password, role };
};

const createUser = async (modelInfo) => {
  const { name, email, password, stringRole } = modelInfo;
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?);`,
  )
    .bind(name)
    .bind(email)
    .bind(password)
    .bind(stringRole)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id, name, email, role: stringRole };
};

module.exports = {
  getUserByEmail,
  createUser,
};
