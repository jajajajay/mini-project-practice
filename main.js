let mysql = require('mysql');

// DB정보
const connection = mysql.createConnection({
    host: 'database-1.clizpn7x5cvc.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '19940422',
    database: 'memo',
    port: '3306',
});

// RDS 접속
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        // connection.query('show databases;', (err, row, fields) => {
        //     console.log(row);
        // });

        // connection.query('create database memo', function (err, rows, fields) {
        //     console.log(rows);
        // });

        // connection.query('use memo;', (err) => {
        //     if (err) throw err;
        // });

        // connection.query('CREATE TABLE memo (number INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20) NOT NULL, date DATE, main VARCHAR(200) NOT NULL, color VARCHAR(10) NULL, menu VARCHAR(10) NULL);', (error, results, fields) => {
        //     if (error) {
        //         throw error;
        //     }
        // });

        connection.query("INSERT INTO memo (title, date, main, color) VALUES ('테스트', now(), '테스트테스트테스트테스트테스트테스트테스트', 'blue')", (err, result, fields) => {
            if (err) throw err;
        });

        connection.query('select * from memo;', (err, result, fields) => {
            if (err) {
                throw err;
            }

            console.log(result);
        });

        console.log('연결완료');
    }
});
