import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
    const host = "http://localhost:5000"
    const dnotes = []
    // const s1={
    //     "name":"mohd ahmad",
    //     "class":"Btech 3rd year "
    // }

    const [notes, setNotes] = useState(dnotes);
    // const update=()=>{
    //     setTimeout(() => {
    //        setState({
    //         "name":"Mohd Ahmad",
    //         "class":"Btech Vth Sem"
    //        }) 
    //     }, 3000);
    // }


    // get all Note
    const getNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
        
    }
    // Add Note
    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const newNote = {
            title:title,
            description:description,
            tag:tag
        }
        setNotes(notes.concat(newNote))
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({title, description, tag})
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic for edit in client site
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes)
    }

    // Delete Note
    const deleteNote = async(id) => {
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
        });
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
    }

    return (
        <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote ,getNotes}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState