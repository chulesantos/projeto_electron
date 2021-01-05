const {Client} = require('pg');

class PostgreSQL {

    constructor(data) {

        this.server = data.server
        this.database = data.database;
        this.table = data.table;
        this.user = data.user;
        this.password = data.pass;
        this.port = data.port;
    }

    run() {

        const client = new Client({
            user: this.user,
            host: this.server,
            database: this.database,
            password: this.password,
            port: this.port,
        });

        client.connect();

        const sql = `select * from ${this.table}`;

        return new Promise((resolve, reject) => {

            client.query(sql)
                .then(result => {
                    resolve(JSON.stringify(result.rows));

                }).catch(error => {
                reject(error);

            }).finally(() => {
                client.end();
            });
        });
    }
}
