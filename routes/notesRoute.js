const express = require('express');
const Note = require('../models/notes');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all notes for the logged-in user

router.get('/', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // JWT should contain the user ID as 'id'
      console.log('User ID:', userId); // Debug log
  
      const notes = await Note.find({ userId });
      console.log('Fetched notes:', notes); // Debug log
  
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// router.get('/', authMiddleware, async (req, res) =>{
//     try{
//         const notes = await Note.find({ user: req.user.id});
//         res.status(200).json(notes);
//     }
//     catch(err){
//         res.status(500).json({message: 'Server error', error: err.message});
//     }
// });

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

// router.put('/:id', authMiddleware, async (req, res) => {
//     try{
//         const {title, content} = req.body;
//         const note = await Note.findOneAndUpdate(
//             {_id: req.params.id, user: req.user.id},
//             {title, content},
//             {new: true}
//         );

//         if(!note){
//             return res.status(404).json({message: 'Note not found'});
//         }

//         res.status(200).json({message: 'Note updated successfully', note});
//     }
//     catch(err){
//         res.status(500).json({message: 'Server error', error: err.message});
//     }
// });

router.delete('/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Check if noteId is defined
      if (!noteId) {
        return res.status(400).json({ message: 'Note ID is required' });
      }
  
      // Find the note by ID and delete it
      const deletedNote = await Note.findByIdAndDelete(noteId);
  
      // If no note is found, return an error
      if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Send success response
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = router;