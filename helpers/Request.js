const request = require('request');

class Request {

    constructor() {

    }

    checkIntegrador(cnpj) {

        return new Promise((resolve, reject) => {

            const url = 'https://pharmanexo.com.br/pharma_integra/CheckCnpj';

            request.post({
                url: url,
                form: JSON.stringify({"cnpj": cnpj})
            }, (error, httpResponse, body) => {

                if (httpResponse.statusCode !== 200) {
                    reject(`Error, Endpoint: ${url} - StatusCode: ${httpResponse.statusCode} - Message: ${httpResponse.statusMessage}`);
                    return;
                }

                if (error) {
                    reject(error);
                    return;
                }

                const parse = JSON.parse(body);

                if (!parse.status) {
                    reject("Error: CNPJ não localizado na Pharmanexo!");
                    return;
                }

                resolve(parse.url);

            });
        });
    }

    sendEstoque(myUrl, myJson) {

        return new Promise((resolve, reject) => {

            request.post({
                url: myUrl,
                headers: {
                    'API_TOKEN': 'PHARMANEXO@@2020_APYKEY',
                    'API_USER': 'pharmanexo',
                    'API_AMBIENTE': 'PRODUCAO'
                },
                form: myJson
            }, (error, httpResponse, body) => {

                if (httpResponse.statusCode !== 200) {
                    reject(`Error, Endpoint: ${myUrl} - StatusCode: ${httpResponse.statusCode} - Message: ${httpResponse.statusMessage}`);
                    return;
                }

                if (error) {
                    reject(error);
                    return;
                }

                /*  const parse = JSON.parse(body);

                  if (!parse.status) {
                      reject("Error: CNPJ não localizado como Integrador na Pharmanexo!");
                      return;
                  }*/

                resolve();

            });
        });
    }
}