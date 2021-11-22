import Service from '../service/serviceFacade';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface Result {
    rows: Array<object>
}

export default class Controller {

    public service: Service;

    constructor() {
        this.service = new Service();
    }

    getStudentList(_: FastifyRequest, responce: FastifyReply) {
        const data = this.service.selectAll('students');
        data.then((result: Partial<Result>) => {
            responce.status(200).send(result.rows);
            console.log(result.rows);
        });
    }

    getStudentInfo(request: any, responce: FastifyReply) {
        const studentId = parseInt(request.params.id);
        const data = this.service.select('*', 'students', studentId);
        data.then((result: Partial<Result>) => {
            responce.status(200).send(result.rows);
        });
    }

    postStudentInfo = (request: any, responce: FastifyReply) => {
        console.log(request.body)
        const {facultyId, dormitoryStatusId, firstName, middleName, lastName, yearOfStudy, dateOfBirth, studentGroup, sex} = request.body;
    
        const data = this.service.postInfo("students", "(facultyId, dormitoryStatusId, firstName, middleName, lastName, yearOfStudy, dateOfBirth, studentGroup, sex)", "($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [facultyId, dormitoryStatusId, firstName, middleName, lastName, yearOfStudy, dateOfBirth, studentGroup, sex])
        data.then((result: any) => {
            responce.status(200).send(`User added with id`);
        });
    }

    getDormitoryList(_: FastifyRequest, responce: FastifyReply) {
        const data = this.service.selectAll('Dormitory');
        data.then((result: Partial<Result>) => {
            responce.status(200).send(result.rows);
            console.log(result.rows);
        });
    }

}