const express = require('express');
const Note = require('../models/notes');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all notes for the logged-in user

router.get('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; 
      console.log('User ID:', userId); // Debug log
  
      const notes = await Note.find({ userId });
      console.log('Fetched notes:', notes); // Debug log
  
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });



// Add new note

router.post('/', authMiddleware, async (req, res) => {
    const {title, content} = req.body;
    try{
        const newNote = new Note({
            userId: req.user.id,
            title,
            content,
            dateCreated: new Date()
        });

         await newNote.save();
         res.json(newNote);
    }
    catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }

});

// Update a Note

router.put('/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
      console.log('Note ID:', noteId);
  
      if (!noteId) {
        return res.status(400).json({ message: 'Note ID is required' });
      }
  
      const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


// delete a Note

router.delete('/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
  
     
      if (!noteId) {
        return res.status(400).json({ message: 'Note ID is required' });
      }
  
      
      const deletedNote = await Note.findByIdAndDelete(noteId);
  
     
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
     
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = router;