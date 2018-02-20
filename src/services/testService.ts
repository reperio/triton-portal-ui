import fetch from 'node-fetch';
import axios from 'axios'

export class TestService {
    async getTestMessage() : Promise<any> {
        const result = await axios.get('/test.json');

        return result;
    }

    async getTestValue() : Promise<string> {
        const response = await fetch('http://localhost:3000/test');
        const json = await response.json();
        return json.test;
    }

    async getNotes() : Promise<string[]> {
        const response = await fetch('http://localhost:3000/notes');
        return await response.json();
    }

    async addNote(note: string) : Promise<string> {
        const payload = {note};
        const response = await fetch(
            'http://localhost:3000/add-note',
            {method: 'POST', body: JSON.stringify(payload)}
        );
        const json = await response.json();
        return json.text;
    }
}