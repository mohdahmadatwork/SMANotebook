import React, { useContext, useState } from 'react'
import contextValue from '../context/notes/NotesContext'
import AlertContext from '../context/alert/AlertContext';
export default function AddNoteForm() {
    const {showAlert} = useContext(AlertContext);
    const context = useContext(contextValue);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleSaveNotes=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        showAlert("Note added successfully","success");
        setNote({title:"",description:"",tag:""}    )
    }
    
    const handleCancel = (e)=>{
        e.preventDefault();
        setNote({title:"",description:"",tag:""})
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form action="">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" required id="title" name="title" onChange={onChange}  value={note.title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} value={note.description} required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
            </div>
            <div className="mb-3 d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-success" onClick={handleSaveNotes}>Save</button>
                <button type="cancel" className="btn btn-outline-danger" onClick={handleCancel} >Cancel</button>
            </div>
            </form>
        </div>
    )
}
