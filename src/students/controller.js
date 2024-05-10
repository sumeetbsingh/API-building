const dataBase = require('./../../db');
const queries = require('./queries');

exports.getStudents = (req, res) => {
    dataBase.query(queries.getStudents, (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows);
    });
};

exports.getStudentsByID = (req, res) => {
    const id = parseInt(req.params.id);
    dataBase.query(queries.getStudentsByID, [id], (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows);
    });
};

exports.addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    dataBase.query(queries.checkEmailExists, [email], (err, result) => {
        if (result.rows.length) res.send("Email already exists!");
        dataBase.query(queries.addStudent, [name, email, age, dob], (err, result) => {
            if(err) throw err;
            res.status(201).send("Student added successfully!");
        });
    });   
};

exports.deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    dataBase.query(queries.getStudentsByID, [id], (err, result) => {
        const noSuchStudent = result.rows.length;
        if (!noSuchStudent) {
            res.send("Student does not exists!");
        }
        dataBase.query(queries.deleteStudent, [id], (err, result) => {
            if(err) throw err;
            res.status(200).send("Student deleted successfully!");
        });
    });   
};

exports.updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;
    dataBase.query(queries.getStudentsByID, [id], (err, result) => {
        const noSuchStudent = result.rows.length;
        if (!noSuchStudent) {
            res.send("Student does not exists!");
        }
        dataBase.query(queries.updateStudent, [email, id], (err, result) => {
            if(err) throw err;
            res.status(200).send("Student updated successfully!");
        });
    });   
};