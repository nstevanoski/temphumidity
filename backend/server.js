const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'temperature'
};

app.get('/send', async (req, res) => {
  const temperature = req.query.temperature;
  const humidity = req.query.humidity;
  
  if (!temperature || !humidity) {
    res.status(400).send('Missing temperature or humidity parameter');
    return;
  }
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = `INSERT INTO data (temperature, humidity) VALUES (?, ?)`;
    const result = await connection.execute(query, [temperature, humidity]);
    res.send(`Inserted ${result.affectedRows} row(s)`);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

app.get('/get-temperature', async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const query = `SELECT * FROM data`;
      const [rows, fields] = await connection.execute(query);
      res.send({data: rows});
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
