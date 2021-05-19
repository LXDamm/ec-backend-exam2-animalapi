import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { getAllAnimals, getAllFacts, getAnimalFacts, addAnimalFact, deleteAnimalFact } from './controllers/animals';

const app = express();

app.use(json());
app.use(urlencoded({
    extended: true
}));
app.use(cors({
    origin: true
}));

app.delete('/animals/:animalId/facts/:factId', deleteAnimalFact);
app.put('/animals/:animalId/facts', addAnimalFact);
app.get('/animals', getAllAnimals)
app.get('/facts', getAllFacts);
app.get('/facts/:animalId', getAnimalFacts);

app.listen(5000, () => console.log("Running"));