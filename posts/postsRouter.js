const express = require('express')
const router = express.Router()
const db = require('../data/db.js') 




router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {
    
})

router.get('/:id/comments', (req, res) => {
    
})
/////////////////////////////////////////////////// Post
router.post('/', (req, res) => {    
    let data = req.body
    .then((post) => {
        if (!data.title || !data.contents){ //if they don't exist, send an error
        res.status(400).json({errorMessage: "Please provide title and content for the post"})
        } else if (data.title && data.contents) { // if they do exist, add to db and send confirmation
            db.insert(req.body);
            res.status(201).json(post);
        }        
    })
    .catch((error) => {
        console.log(error); 
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})
////////////////////////////////////////////////// Post to comments
router.post('/:id/comments', (req, res) => {
    let data = req.body
    let id = data.id
    .then (post => {
        if(!id) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else if (!data.text){
            res.status(400).json({errorMessage: "Please provide text for the comment."})
        } else if (data.text){
            db.insertComment(data)
            res.status(201).json({data})
        } else {res.status(500).json({ error: "There was an error while saving the comment to the database"})}
    })
    
})
////////////////////////////////////////////////
router.delete('/:id', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})










module.exports = router;
