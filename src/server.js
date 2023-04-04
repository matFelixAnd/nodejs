const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2')

const app = express();

// Adiciona um middleware para processar requisições POST com payload em JSON
app.use(bodyParser.json());

// Mensagem de funcionamento no navegador.	
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));



app.post('/boleto', (req, res) => {
    const boleto = req.body
    const idintegracao = boleto.titulo.idintegracao
    const status = boleto.titulo.situacao
    const numTitulo = boleto.titulo.TituloNossoNumero
    const hora = boleto.dataHoraEnvio

    res.status(200).send(console.log(boleto));

    {
        // Se a requisição não for referente a um evento válido, responde com um erro 400 Bad Request
        res.status(400);
    }

    const sql = `INSERT INTO api_boleto (api_id, api_st, api_titnum, api_dtca) VALUES ('${idintegracao}', '${status}','${numTitulo}' ,'${hora}')`
    console.log('salvo')

    conn.query(sql, function (err) {
        console.log(err)
    })
});

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'boletos'
});

conn.connect(function (err) {
    if(err){
        console.log(err)
    }
    else {
        console.log('conectado ao banco')
    }
    })


// Inicia o servidor na porta desejada
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

