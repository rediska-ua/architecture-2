"use strict";

const { Client } = require('pg');
import { Config } from './config';


export class Connection {

    private static _instance: Connection;
    private config: Config;

    private constructor (config: Config) {
        this.config = config;
    };

    public static getInstance(config: Config): Connection {
        if (!Connection._instance) {
            Connection._instance = new Connection(config);
        };
        return Connection._instance;
    };


    public query(sqlQuery: string, args: Array<string | number> = []) {
        const {user, host, database, password, port} = Connection._instance.config;
        const client = new Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port
        });
        client.connect();
        const result = client.query(sqlQuery, args);
        return result;
    };
}
