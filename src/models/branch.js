module.exports = (sequelize, DataTypes) => {
    // schema for the questions table....
    const Branch = sequelize.define(
        'Branch', {
        branch_id: {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'branch_id'
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'name'
        },
        Capacity: {
            type: DataTypes.NUMBER(200),
            allowNull: false,
            primaryKey: false,
            field: 'Capacity'
        },
    }, {
        timestamps: false,
        tableName: 'branch'
    }
    );
    return Branch;
} 