import './fact';

interface Animal {
    uid: string;
    name: string;
    facts: Array<Fact>;
}

export { Animal };