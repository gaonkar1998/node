const db = require('../models/index');
const { User } = db.sequelize.models;
const bcrypt = require('bcrypt');
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const getUser = await User.findAll({
        where: {
            email
        }
    });
    if (getUser.length) {
        const hashedPassword = bcrypt.compareSync(password, getUser[0].password);
        if (hashedPassword) {
            const userDetails = getUser.map(el => el.get({ plain: true }))
            return { status: 200, data: userDetails }
        }
        else {
            return { status: "error", data: [] }
        }
    }
    else {
        return { status: 'error', data: [] }
    }
}
module.exports = {
    loginUser
}