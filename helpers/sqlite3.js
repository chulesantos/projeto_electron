const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/sqlite.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    //   console.log('Conexão SQLite3');
});

$(function () {

    let idDriver;

    db.serialize(() => {
        db.get(`SELECT *
                FROM configs`, (err, result) => {
            if (err) {
                console.error(err.message);
            }

            idDriver = result.driver;

            $('#server').val(result.host);
            $('#port').val(result.port);
            $('#database').val(result.database);
            $('#user').val(result.user);
            $('#pass').val(result.pass);
            $('#table').val(result.view);
            $('#cnpj').val(result.cnpj);


            if (result.tls == 1) {
                $('#crypto').attr('checked', true);
            }

            $('option', '#tempoIntegracao').each((index, value) => {

                let me = $(value);

                if (result.minuto == me.val()) {
                    me.attr('selected', true);
                }
            });
        });
    });

    db.serialize(() => {
        db.each(`SELECT *
                 FROM drivers`, (err, result) => {
            if (err) {
                console.error(err.message);
            }

            let seleted = '';

            if (result.id == idDriver) {
                seleted = 'selected';
            }

            let option = `<option ${seleted} value="${result.id}">${result.driver}</option>`;

            $('#driverBanco').append(option);

        });
    });
});