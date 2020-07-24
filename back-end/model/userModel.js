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

module.exports = {
  getUserByEmail,
};
