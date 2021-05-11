import express, { urlencoded } from 'express';
import { test } from './controllers/animals';

const app = express();

app.use(express.json);
app.use(express.urlencoded);

app.get('/test', test);
app.all('*', (request, response) => response.send("My god it's full of animals"));

app.listen(8080, () => console.log("Running"));