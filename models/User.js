const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
       id: {
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey: true,
       },
       username: {
           type: DataTypes.STRING,
           unique: true,
           allowNull: false,
       },
       email: {
           type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
       },
       password: {
           type: DataTypes.STRING,
           allowNull: false,
       }
    })

    User.beforeSave(async user => {
        if(user.password)
            user.password = await bcrypt.hash(user.password, 10);
    })

    User.prototype.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    }

    User.prototype.getToken = function() {
        return jwt.sign(
            {
                id: this.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE
            }

        )
    }

    return User;

}