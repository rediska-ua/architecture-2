import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';
import { QueryBuilder } from './Builder';
import { Connection } from './dbConnection';
import { Config } from './config';

const fastifyServer: FastifyInstance = fastify();

const config: Config = {
    user: "postgres",
    host: "localhost",
    database: "kpi-dormitory",
    password: "HelloWorld2021",
    port: 5432
};
interface Result {
    rows: Array<object>
}

const db = Connection.getInstance(config);

const PORT = process.env.PORT || 8080

const builder = new QueryBuilder();

fastifyServer.get('/', (req: FastifyRequest, res: FastifyReply) => {
    res.send({hello: 'world'})
})

const getAllStudents = (_: FastifyRequest, responce: FastifyReply) => {
    //const query = "SELECT * FROM students";
    const query = builder.select('*', 'students').getQuery();
    const data = db.query(query);
    data.then((result: Partial<Result>) => {
        responce.status(200).send(result.rows);
        console.log(result.rows);
    });
};

const getStudentById = (request: any, responce: FastifyReply) => {
    const studentId = parseInt(request.params.id);
    
    const data = db.query("SELECT * FROM students WHERE student_id = $1", [studentId]);
    data.then((result: Partial<Result>) => {
        responce.status(200).send(result.rows);
    });
}

const insertStudents = (request: any, responce: FastifyReply) => {
    const {firstname, lastname, email, sex, dateOfBirth, studentGroup} = request.body;

    const data = db.query("INSERT INTO students (firstname, lastname, email, sex, dateOfBirth, studentGroup) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstname, lastname, email, sex, dateOfBirth, studentGroup])
    data.then((result: any) => {
        responce.status(200).send(`User added with id`);
    });
};


fastifyServer.get('/students', getAllStudents);
fastifyServer.get('/students/:id', getStudentById);
fastifyServer.post('/students', insertStudents);

const start = async () => {
    try {
        await fastifyServer.listen(PORT, '0.0.0.0');
        const address: any = fastifyServer.server.address();
        fastifyServer.log.info(`server is listening on ${address.port}`);
    }
    catch (err) {
        fastifyServer.log.error(err);
        process.exit(1);
    }
};

start();