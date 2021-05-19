import express, { request } from 'express';
import admin from '../firebase-config';
import { v4 as uuidv4 } from 'uuid';
import { Animal } from '../types/animal';

const db = admin.firestore();

export const getAllAnimals = (request: express.Request, response: express.Response) => {
    const query = db.collection('animals').get();
    query.then((docs) => {
        if (!docs.empty) {
            const animals = docs.docs.map((animal) => {
                return animal.data();
            });
            response.json(animals);
        }
    });
}

export const getAllFacts = (request: express.Request, response: express.Response) => {
    const query = db.collection('animals').get();
    query.then((docs) => {
        if (!docs.empty) {
            const facts = docs.docs.reduce((accumulator, value) => {
                return (accumulator).concat((value.data() as Animal).facts)
            }, new Array<Fact>());
            const set = new Set<Fact>(facts);
            response.json(Array.from(set));
        }
    });
}

export const getAnimalFacts = (request: express.Request, response: express.Response) => {
    const animalId = request.params.animalId;
    const query = db.collection('animals').where('id', '==', animalId).get();
    query.then((docs) => {
        if (!docs.empty) {
            const facts = docs.docs[0].data().facts;
            response.json(facts);
        }
    });
}

// [ 'bloodsucker', 'nocturnal', 'flying', 'mammal', 'small' ]
export const addAnimalFact = (request: express.Request, response: express.Response) => {
    const animalId = request.params.animalId;
    const { fact } = request.body;
    let query = db.collection('animals').where('uid', '==', animalId).get();
    query.then((docs) => {
        if (!docs.empty) {
            const { facts } = docs.docs[0].data();
            facts.push({ fact: fact, uid: uuidv4()});
            const update = docs.docs[0].ref.update('facts', facts)
            .catch((error) => console.error(error));
            response.send('OK');
        }
    });
}

export const deleteAnimalFact = (request: express.Request, response: express.Response) => {
    const animalId = request.params.animalId;
    const factId = request.params.factId;
    let query = db.collection('animals').where('uid', '==', animalId).get();
    query.then((docs) => {
        if (!docs.empty) {
            let { facts } = docs.docs[0].data();
            facts = (facts as Array<Fact>).filter((value, index) => {
                if (value.uid !== factId) return value;
            });
            const update = docs.docs[0].ref.update('facts', facts)
            .catch((error) => console.error(error));
            response.send('OK');
        }
    });
}