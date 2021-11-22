import { QueryBuilder } from '../Builder';
import { StudentHasBenefitsSpecification, Student } from '../specification';
import { DormitoryHandler, StudentBenefitHandler, Handler } from '../chainOfResponsibility';
import { Connection } from '../dbConnection';
import { config } from '../config';

export default class Service {
    
    private queryBuilder: QueryBuilder;
    private studentSpecification: StudentHasBenefitsSpecification;
    private dormHandler: DormitoryHandler;
    private studentHandler: StudentBenefitHandler;
    private connection: Connection;

    constructor() {
        this.queryBuilder = new QueryBuilder();
        this.studentSpecification = new StudentHasBenefitsSpecification();
        this.dormHandler = new DormitoryHandler();
        this.studentHandler = new StudentBenefitHandler();
        this.connection = Connection.getInstance(config);
    }

    selectAll(table: string): any {
        const sqlQuery = this.queryBuilder.select('*', table).getQuery();
        return this.connection.query(sqlQuery);
    }

    select(query: string, table: string, condition: string | number): any {
        const sqlQuery = this.queryBuilder.selectWhere(query, table, condition).getQuery();
        return this.connection.query(sqlQuery);
    }

    postInfo(table: string, columns: string, values: string, args: Array<any>): any {
        console.log(args);
        const sqlQuery = this.queryBuilder.post(table, columns, values).getQuery();
        return this.connection.query(sqlQuery, args);
    }

}