import fastify from 'fastify';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Controller from './controllers/controller';


export class App {

    public controller: Controller;
    public fastifyServer: FastifyInstance;

    public constructor () {
        this.controller = new Controller();
        this.fastifyServer = fastify();
    }

    makeRoutes() {
        console.log(this.controller.service);
        this.fastifyServer.get('/', (req: FastifyRequest, res: FastifyReply) => {
            res.send({hello: 'world'})
        });
        this.fastifyServer.get('/students', this.controller.getStudentList.bind(this.controller));
        this.fastifyServer.get('/students/:id', this.controller.getStudentInfo.bind(this.controller));
        this.fastifyServer.post('/students', this.controller.postStudentInfo.bind(this.controller));
        this.fastifyServer.get('/dormitories', this.controller.getDormitoryList.bind(this.controller));
    }
}