function errorMessage(error) {

    $('#errorMessage').html(`
                    <button type="button" 
                            class="btn btn-block btn-danger" 
                            data-toggle="modal" 
                            data-target="#exampleModal">
                     Houve um erro: Clique para detalhes!
                    </button>`);

    $('#errorDetalhe').html(error);
}

async function start(data) {

    const fs = require('fs-extra');

    const moment = require('moment');

    const thisMoment = moment().format('DD/MM/YYYY H:mm:ss');

    const dirLog = `./logs/${moment().format('YYYYMMDD')}`;

    const logFile = `${dirLog}/logFile.txt`;

    const stockFile = `./files/stockFile.json`;

    const textLogSuccess = `${moment().format('DD/MM/YYYY H:mm:ss')} => Última atualização de estoque realizada com sucesso!`;

    fs.ensureDirSync(dirLog, {mode: 0o775});

    try {

        const request = new Request();

        let urlPost = await request.checkIntegrador(data.cnpj);

        /**
         * Drivers:
         * 1 => OracleDB
         * 2 => SQL Server
         * 3 => MySQL
         * 4 => PostgreSQL
         */

        let jsonQueryResult = null;

        switch (data.driver) {

            case 1:

                const driverOracle = new OracleDB(data);

                jsonQueryResult = await driverOracle.run();

                break;

            case 2:

                const driverSqlServer = new SqlServer(data);

                jsonQueryResult = await driverSqlServer.run();

                break;

            case 3:

                const driverMySQL = new MySQL(data);

                jsonQueryResult = await driverMySQL.run();

                break;

            case 4:

                const driverPg = new PostgreSQL(data);

                jsonQueryResult = await driverPg.run();

                break;
        }

        fs.outputFileSync(stockFile, jsonQueryResult);

        await request.sendEstoque(urlPost, jsonQueryResult);

        fs.appendFile(logFile, `${textLogSuccess}\n`);

        $('#date').html(textLogSuccess);

    } catch (error) {

        fs.appendFile(logFile, `${thisMoment} => ${error}\n`);

        errorMessage(error);
    }
}