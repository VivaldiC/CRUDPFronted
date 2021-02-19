import  React, { Component } from  'react';

import  NotesService  from  './NotesService';

const  notesService  =  new  NotesService();

class  NotesList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        notes: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    notesService.getNotes().then(function (result) {
        console.log(result);
        self.setState({ notes:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e, id){
    var  self  =  this;
    notesService.deletenote({id :  id}).then(()=>{
        var  newArr  =  self.state.notes.filter(function(obj) {
            return  obj.id  !==  id;
        });

        self.setState({notess:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
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
                <th>Note Tittle</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.notes.map( c  =>
                <tr  key={c.id}>
                <td>{c.id}  </td>
                <td>{c.task_title}</td>
                <td>{c.description}</td>
                <td>{c.createdAt}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.id) }> Delete</button>
                <a  href={"/note/" + c.id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  NotesList;