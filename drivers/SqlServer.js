const mssql = require('mssql');

class SqlServer {

    constructor(data) {

        this.server = data.server;
        this.database = data.database;
        this.table = data.table;
        this.user = data.user;
        this.password = data.pass;
        this.port = parseInt(data.port);
        this.crypto = !!data.cripto;
    }

    run() {

        const config = {
            server: this.server,
            database: this.database,
            user: this.user,
            password: this.password,
            port: this.port,
            encrypt: this.crypto
        };

        const dbConn = new mssql.ConnectionPool(config);

        const query = `select * from ${this.table}`;

        return new Promise((resolve, reject) => {

            dbConn.connect().then(() => {

                const request = new mssql.Request(dbConn);

                return request;

            }).then(result => {

                return result.query(query);

            }).then((result) => {

                resolve(JSON.stringify(result.recordset));

            }).catch(error => {
                reject(error);

            }).finally(() => {
                dbConn.close();
            });
        });
    }
}