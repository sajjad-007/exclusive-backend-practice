const bcrypt = require('bcrypt');

const bcryptPassword = async ( PlaintextPassword) => {

    return bcrypt.hash(PlaintextPassword, 10)
}
// const bcryptComparePass = async (PlaintextPassword,password) => {

//     bcrypt.compare(PlaintextPassword, password);
// }

module.exports = {bcryptPassword}