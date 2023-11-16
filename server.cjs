import express from 'express';
import pgp from 'pg-promise';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const pgp = require('pg-promise')();
const db = pgp('postgres://username:password@localhost:5432/database');

app.get('/', async (req, res) => {
  try {
    // запросы к базе данных с использованием pg-promise
    const result = await db.any('SELECT * FROM таблица');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
