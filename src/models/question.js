module.exports = (sequelize, DataTypes) => {
    // schema for the questions table....
    const Question = sequelize.define(
        'Question', {
        question_id: {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'question_id'
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'title'
        },
        type: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'type'
        },
        marks : {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: false,
            field: 'marks'
        },
    }, {
        timestamps: false,
        tableName: 'question'
    }
    );
    return Question;
} 