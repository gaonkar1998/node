const db = require('../models/index');
const { User } = db.sequelize.models;

const loginUser = async (req, res) => 
{
    const email = req.body.email;
    const password = req.body.password;
    getUser = await User.findAll({
        where: {
            email,
            password
        }
    });
    const userDetails = getUser.map(el => el.get({ plain: true }));
    return { status: 200, data: userDetails };
}
module.exports={
    loginUser
}