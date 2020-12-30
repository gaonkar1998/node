const db = require('../models/index');
const { User } = db.sequelize.models;
const bcrypt = require('bcrypt');
const loginUser = async (req, res) => 
{
    const email = req.body.email;
    const password = req.body.password;
    var saltRounds = 10;
    await bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            throw err
        } else {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log("password hash is"+hash)
                if (err) {
                    throw err
                } else {
                    hashedPassword = hash;
                }
            })
        }
    });
    const getUser = await User.findAll({
        where: {
            email
        }
    });
    if (getUser.length) {
        return new Promise(function(resolve, reject) {

            bcrypt.compare(password, getUser[0].password, function(err, isMatch) {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    resData = { status: 'error', data: [] }
                    resolve(resData);
                } else {
                    const userDetails = getUser.map(el => el.get({ plain: true }))
                    resData = { status: 200, data: userDetails }
                    resolve(resData);
                }
            })
        });
    } else {
        return { status: 'error', data: [] }
    }
}
module.exports={
    loginUser
}