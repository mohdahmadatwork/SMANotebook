const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//ROUTE 1: get all the notes using: GET "/api/notes/createuser". login Required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes)
})



//ROUTE 2: add a new note using: POST "/api/notes/addnote".  login Required
router.post('/addnote', fetchuser, [
    body('title', "Enter a title").exists(),
    body('description', "Enter a description").exists()
], async (req, res) => {
    const { title, description, tag } = req.body;
    // if there are errors, return bad request and error
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {

    }
})



//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote".  login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        // create new note object
        let newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        
        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found");}
        
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })



//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote".  login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found");}
        // Check if the right user is deleting the right note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })



module.exports = router