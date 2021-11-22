const { Client } = require('pg');

const connection = new Client({
    user: "postgres",
    host: "localhost",
    database: "kpi-dormitory",
    password: "HelloWorld2021",
    port: 5432
});

connection.connect();

const getAllStudents = (request, responce) => {
    connection.query("SELECT * FROM students", (err, result) => {
        if (err) {
            throw (err);
        };
        responce.status(200).send(result.rows);
    });
};


const getStudentById = (request, responce) => {
    const studentId = parseInt(request.params.id);
    
    connection.query("SELECT * FROM students WHERE student_id = $1", [studentId], (err, result) => {
        if (err) {
            throw (err);
        };
        responce.status(200).send(result.rows);
    });
};

const insertStudents = (request, responce) => {
    const {firstname, lastname, email, sex, dateOfBirth, studentGroup} = request.body;

    connection.query("INSERT INTO students (firstname, lastname, email, sex, dateOfBirth, studentGroup) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstname, lastname, email, sex, dateOfBirth, studentGroup],
    (err, result) => {
        if (err) {
            throw (err);
        };
        responce.status(200).send(`User added with id ${result.id}`);
    });
};


module.exports = { getAllStudents, getStudentById, insertStudents };