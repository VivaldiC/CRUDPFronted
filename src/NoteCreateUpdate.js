import React, { Component } from 'react';
import NotesService from './NotesService';

const notesService = new NotesService();

class NoteCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.id)
        {
          notesService.getNote(params.id).then((c)=>{
            this.refs.task_title.value = c.task_title;
            this.refs.task_title.value = c.task_title;
            this.refs.createdAt.value = c.createdAt;
          })
        }
      }

      handleCreate(){
        notesService.createNote(
          {
            "task_title": this.refs.task_title.value,
            "description": this.refs.description.value,
            "createdAt": this.refs.createdAt.value
        }
        ).then((result)=>{
          alert("Task created!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleUpdate(id){
        notesService.updateNote(
          {
            "id": id,
            "task_title": this.refs.task_title.value,
            "description": this.refs.description.value,
            "createdAt": this.refs.createdAt.value
        }
        ).then((result)=>{
          console.log(result);
          alert("Task updated!");
        }).catch(()=>{
          alert('There was an error! Please re-check your form.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.id){
          this.handleUpdate(params.id);
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
              Task Name:</label>
              <input className="form-control" type="text" ref='task_title' />

            <label>
              Task Description:</label>
              <input className="form-control" type="text" ref='description'/>

            <label>
              Task Date</label>
              <input className="form-control" type="text" ref='createdAt' />

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }
}

export default NoteCreateUpdate;