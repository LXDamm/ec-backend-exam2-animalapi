import express from 'express';
import admin from '../firebase-config';
import { Animal } from '../types/animal';

const db = admin.firestore();

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
    const name = request.params.name;
    const query = db.collection('animals').where('name', '==', name).get();
    query.then((docs) => {
        if (!docs.empty) {
            const facts = docs.docs[0].data().facts;
            response.json(facts);
        }
    });
}