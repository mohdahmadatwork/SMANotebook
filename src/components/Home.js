import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNoteForm from './AddNoteForm'
import Notes from './Notes'
import contextValue from '../context/notes/NotesContext'
import AlertContext from '../context/alert/AlertContext'
import {useNavigate} from 'react-router-dom';
export default function Home() {
  let navigate = useNavigate();
  const context1 = useContext(AlertContext)
  const {showAlert} = context1;
  const context = useContext(contextValue);
  const { notes, getNotes,editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [enote, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
  const handleSaveEdit = (e) => {
    editNote(enote.id,enote.etitle,enote.edescription,enote.etag);
    refClose.current.click();
    showAlert("Note updated Successfully","success");
  }
  const onChange = (e) => {
    setNote({ ...enote, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      getNotes();
    }
    else{
      navigate("/login")
    }
  }, [])


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  return (
    <>
      <div className='container my-3'>
        <h1>Add Your Note</h1>
        <AddNoteForm />
        <h2 className='my-4'>Your Notes:</h2>
        <div className="container row mb-4">
          {notes.length===0&&"No Notes to display"}
          {notes.map((note) => {
            return <div key={note._id} className="col-4 my-3">
              <Notes notes={note} updateNote={updateNote} showAlert={showAlert} />
            </div>
          })}
        </div>
      </div>
      {/* MODAL for update notes */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit notes
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <form action="">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={enote.etitle} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea className="form-control" id="edescription" name="edescription" rows="3" onChange={onChange} value={enote.edescription} required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={enote.etag} />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
