import  React, { Component } from  'react';

import  NotesService  from  './NotesService';

const  notesService  =  new  NotesService();

class NotesCreateUpdate extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } =  this.props;
        if(params  &&  params.pk)
        {
            notesService.getNote(params.pk).then((note)=>{
                this.refs.noteTitle.value  =  note.noteTitle;
                this.refs.noteDescription.value  =  note.noteDescription;
            })
        }
    }

    handleCreate(){
        notesService.createNote(
            {
            "noteTittle":  this.refs.noteTitle.value,
            "noteDescription":  this.refs.noteDescription.value
            }).then((result)=>{
                    alert("Tarea Creada!");
            }).catch(()=>{
                    alert('Existe un error, por favor verifique su formulario');
            });
    }

    handleUpdate(pk){
        notesService.createNote(
            {
            "pk":  pk,
            "noteTittle":  this.refs.noteTittle.value,
            "noteDescription":  this.refs.noteDescription.value,
            "noteDate": this.refs.noteDate.value,
            }
            ).then((result)=>{
        
                alert("Tarea Actializada!");
            }).catch(()=>{
                alert('Existe un error, por favor verifique su formulario');
            });
        }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
        if(params  &&  params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Tittle</label>
              <input className="form-control" type="text" ref='noteTittle' />

            <label>
              Description:</label>
              <input className="form-control" type="text" ref='noteDescription'/>

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
  }

}

export default NotesCreateUpdate;