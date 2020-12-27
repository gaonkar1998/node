module.exports = (sequelize, DataTypes) => {
    // schema for the questions table....
    const Exam = sequelize.define(
        'Exam', {
            exam_id: {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'exam_id'
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: false,
            field: 'name'
        },
        date: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'date'
        },
        duration: {
            type: DataTypes.STRING(200),
            allowNull: false,
            primaryKey: false,
            field: 'duration'
        },
        question_count : {
            type: DataTypes.NUMBER(20),
            allowNull: false,
            primaryKey: false,
            field: 'question_count'
        },
    }, {
        timestamps: false,
        tableName: 'exams'
    }
    );
    return Exam;
} 