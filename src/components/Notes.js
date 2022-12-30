import React,{ useContext} from 'react'
import contextValue from '../context/notes/NotesContext'

export default function Notes(props) {
    const context = useContext(contextValue);
    const {deleteNote} = context;
    const { notes ,updateNote,showAlert} = props
    return (

        <div className="card border-dark mb-3 h-100" style={{ maxWidth: "18rem"}}>
            <div className="card-header bg-transparent border-dark">{notes.title}</div>
            <div className="card-body text-dark">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">{notes.description}</p>
            </div>
            <div className="card-footer bg-transparent border-dark d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-warning" onClick={()=>{updateNote(notes)}}><i className="fa-regular fa-pen-to-square"></i> Edit</button>
                <button type="cancel" className="btn btn-outline-danger" onClick={()=>{deleteNote(notes._id);showAlert("Note deleted successfully","success");}}><i className="fa-sharp fa-solid fa-trash"></i> Delete</button>
            </div>
        </div>
    )
}
