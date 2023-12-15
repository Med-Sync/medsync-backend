const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
};

exports.decryptPassword = async (plainText, hashed) => {
  try {
    return await bcrypt.compare(plainText, hashed);
  } catch (err) {
    console.log(err);
  }
};
