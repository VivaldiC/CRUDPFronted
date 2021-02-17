import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class NotesService{

    constructor(){}


    getNotes() {
        const url = `${API_URL}/api/notes/`;
        return axios.get(url).then(response => response.data);
    }
    getNotesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getNote(pk) {
        const url = `${API_URL}/api/notes/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteNote(note){
        const url = `${API_URL}/api/notes/${note.pk}`;
        return axios.delete(url);
    }
    createNote(note){
        const url = `${API_URL}/api/notes/`;
        return axios.post(url,note);
    }
    updateNote(note){
        const url = `${API_URL}/api/notes/${note.pk}`;
        return axios.put(url,note);
    }
}