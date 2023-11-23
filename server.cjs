import express from 'express';
import pgPromise from 'pg-promise';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const pgp = pgPromise(); // изменено название переменной
const db = pgp('postgres://vika:123@localhost:5432/currencies');

app.get('/', async (req, res) => {
  try {
    // запросы к базе данных с использованием pg-promise
    const result = await db.any('SELECT * FROM currencies');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
