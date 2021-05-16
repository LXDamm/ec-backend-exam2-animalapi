import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { getAllFacts, getAnimalFacts } from './controllers/animals';

const app = express();

app.use(json());
app.use(urlencoded({
    extended: true
}));
app.use(cors({
    origin: true
}));

app.get('/facts', getAllFacts);
app.get('/facts/:name', getAnimalFacts);

app.listen(5000, () => console.log("Running"));