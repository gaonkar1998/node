module.exports = (sequelize, DataTypes) => {
    // schema for the user table....separate schema for each table
    const User = sequelize.define(
        'User', {
        user_id: {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'user_id'
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'email'
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'password'
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'first_name'
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'last_name'
        },
        role: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'role'
        },
    }, {
        timestamps: false,
        tableName: 'register'
    }
    );
    return User;
} 