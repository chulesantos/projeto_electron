const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

class OracleDB {

    constructor(data) {

        this.server = data.server;
        this.database = data.database;
        this.table = data.table;
        this.user = data.user;
        this.pass = data.pass;
        this.port = data.port;
    }

    run() {

        return new Promise((resolve, reject) => {

            const myTNS = `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${this.server})(PORT = ${this.port}))(CONNECT_DATA =(SID= ${this.database})))`;

            oracledb.getConnection({
                user: this.user,
                password: this.pass,
                connectString: myTNS
            }, (error, connection) => {

                if (error) {
                    reject(error);
                    return;
                }

                connection.execute(`SELECT * FROM ${this.table}`, (error, result) => {

                    if (error) {
                        reject(error);
                        return;
                    }

                    connection.close();

                    resolve(JSON.stringify(result.rows));

                });
            });
        });
    }
}
