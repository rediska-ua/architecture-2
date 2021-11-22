"use strict";

interface Bulder {
    select(query: string, table: string): QueryBuilder,
    delete(condition: string, table: string): QueryBuilder,
    update(condition: string, table: string, value: string): QueryBuilder
}

export class QueryBuilder implements Bulder {

    private query: string;

    constructor() {
        this.reset();
        this.query = '';
    }

    public reset(): void {
        this.query = '';
    }

    public select(query: string, table: string): QueryBuilder {
        this.query = `SELECT ${query} FROM ${table}`;
        return this;
    }

    public selectWhere(query: string, table: string, condition: string | number): QueryBuilder {
        this.query = `SELECT ${query} FROM ${table} WHERE studentId = ${condition}`;
        return this;
    }

    public post(table: string, columns: string, values: string): QueryBuilder {
        this.query = `INSERT INTO ${table} ${columns} VALUES ${values}`;
        return this;
    }

    public delete(condition: string, table: string): QueryBuilder {
        this.query = `DELETE FROM ${table} WHERE ${condition}`;
        return this;
    }

    public update(condition: string, table: string, value: string): QueryBuilder {
        this.query = `UPDATE ${table} SET ${value} WHERE ${condition}`;
        return this;
    }

    public getQuery(): string {
        const result = this.query;
        this.reset();
        return result;
    }

}
 

