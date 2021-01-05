const mysql = require('mysql');

class MySQL {

    constructor(data) {

        this.server = data.server
        this.database = data.database;
        this.table = data.table;
        this.user = data.user;
        this.password = data.pass;
        this.port = data.port;
    }

    run() {

        const connection = mysql.createConnection({
            host: this.server,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
        });

        connection.connect();

        const sql = `select * from ${this.table}`;

        return new Promise((resolve, reject) => {

            connection.query(sql, (error, results, fields) => {

                if (error) {
                    reject(error);
                }

                const result = JSON.stringify(results);

                connection.end();

                resolve(result);
            });
        });
    }
}
