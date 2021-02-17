import  React, { Component } from  'react';

import  NotesService  from  './NotesService';

const  notesService  =  new  NotesService();

class NotesList extends Component{

    constructor(props){
        super(props);
        this.state = {
            notes: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        var self = this;
        notesService.getNotes().then(function(result){
            self.setState({notes: result.data, nextPageURL: result.nextlink})
        });
    }

    handDelete(){
        var self = this;
        notesService.deleteNote({pk : pk}).then(() => {
            var newArr = self.state.notes.filter(function (obj){
                return obj.pk !== pk;
            });
            self.setState({notes: newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        notesService.getNotesByURL(this.state.nextPageURL).then((result) => {
            self.setState({ notes:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
        <div  className="customers--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>Tittle</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.notes.map( note  =>
                    <tr  key={note.pk}>
                        <td>{note.pk}  </td>
                        <td>{note.tittle}</td>
                        <td>{note.description}</td>
                        <td>{note.date}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                        <a  href={"/notes/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }

}

export default NotesList;