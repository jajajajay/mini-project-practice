let mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-1.clizpn7x5cvc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '19940422',
    database: 'memo',
    port: '3306',
    dateStrings: 'date',
});

connection.connect();
module.exports = connection;
