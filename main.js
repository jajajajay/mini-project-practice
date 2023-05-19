const { request } = require('http');
const mysql = require('mysql'),
    fs = require('fs'),
    ejs = require('ejs'),
    express = require('express'),
    bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '940422',
    database: 'memo',
    port: '3306',
    dateStrings: 'date',
});

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
    fs.readFile('public/memo.html', 'utf-8', (error, data) => {
        connection.query('SELECT * FROM memo', (error, results) => {
            if (error) {
                throw error;
            }
            response.send(
                ejs.render(data, {
                    data: results,
                })
            );
        });
    });
});

app.get('/modify/:id', (request, response) => {
    fs.readFile('public/modify.html', 'utf-8', (error, data) => {
        connection.query('SELECT * FROM memo WHERE number = ?', [request.params.id], (error, results) => {
            if (error) {
                throw error;
            }
            response.send(
                ejs.render(data, {
                    data: results[0],
                })
            );
        });
    });
});

app.get('/create', (request, response) => {
    fs.readFile('public/create.html', 'utf-8', (error, data) => {
        if (error) {
            throw error;
        }
        response.send(data);
    });
});

app.get('/delete/:id', (request, response) => {
    connection.query('DELETE FROM memo WHERE number = ?', [request.params.id], (error) => {
        if (error) {
            throw error;
        }
        response.redirect('/');
    });
});

app.post('/create', (request, response) => {
    const body = request.body;

    connection.query("INSERT INTO memo (title, date, main, color) VALUES (?, DATE_FORMAT(now(), '%Y-%m-%d'), ?, ?)", [body.title, body.main, body.color], (error, results) => {
        if (error) {
            throw error;
        }
        response.redirect('/');
    });
});

app.post('/modify/:id', (request, response) => {
    const body = request.body;

    connection.query('UPDATE memo SET title = ?, main = ?, color = ? WHERE number = ?', [body.title, body.main, body.color, request.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        response.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('localhost:3000');
});

/* connection.connect();

 connection.query('CREATE TABLE memo (number INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20) NOT NULL, date DATE, main VARCHAR(200) NOT NULL);', (error) => {
    if (error) {
        throw error;
    }
}); */

/* connection.query("INSERT INTO memo (title, date, main) VALUES ('테스트', now(), '테스트테스트테스트테스트테스트테스트테스트')", (error) => {
    if (error) {
        throw error;
    }
}); */
