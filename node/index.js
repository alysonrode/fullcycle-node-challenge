const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle-node-db'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.query('CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))');

//Inserção de dados estatica apenas para demonstração
const populateDatabase = () =>{
    connection.query(`INSERT INTO people(name) VALUES("Diogo")`);
    connection.query(`INSERT INTO people(name) VALUES("Rafael")`);
    connection.query(`INSERT INTO people(name) VALUES("Paula")`);
    connection.query(`INSERT INTO people(name) VALUES("Gustavo")`);
}


let objects = [];

app.get('/', (req, res) => {

    populateDatabase();

    let html = '<h1>Full Cycle!</h1>';
    
    connection.query('SELECT * FROM people', function (err, results) {
        if(err){
            throw err;
        }
        html += `<ul>` 
    
        Object.keys(results).forEach(function(key){
            let row = results[key];
            html+= `<li>${row.id} - ${row.name}</li>`;
        })
        html += `</ul>`
        res.send(html);
    });
})

connection.end;
app.listen(port, () => console.log('Node executing on port ' + port));

