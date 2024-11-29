const bcrypt = require('bcrypt');

const bcryptPassword = async ( PlaintextPassword) => {

    return bcrypt.hash(PlaintextPassword, 10)
}
const bcryptComparePassword = async (PlaintextPassword,hassPassword) => {

    return bcrypt.compare(PlaintextPassword, hassPassword);
    // console.log(bcrypt.compare(PlaintextPassword, hassPassword));
    
}

module.exports = {bcryptPassword, bcryptComparePassword}