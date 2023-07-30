const emailExistOrNot = `
  select * from user where email = ?
`;

const insertEmailPass = `
  INSERT INTO user (_id,email, password) values(?,?, ?)
`;
const getUserInformationQuery = `
  SELECT * from user where _id = ?
`;

module.exports = {
  emailExistOrNot,
  insertEmailPass,
  getUserInformationQuery
};
