const express = require('express')
const router = express.Router()
const db = require('../data/db.js')

//////////////////////////////////////////////Get all posts
router.get('/', (req, res) => {
    
    db.find(req.query)
        .then(post => {
            res.status(200).json(post)
})      .catch(error => {
    console.log(error);
    res.status(500).json({error: "The posts information could not be retrieved."})
})
})
//////////////////////////////////////////////////////////// Get post by ID
router.get('/:id', (req, res) => {
    let data = req.body
    db.findById(req.params.id)
        .then(post => {
            if(post){
                res.status(200).json(post)
            } else {res.status(404).json({message: "The post with the specified ID does not exist."})}
        })
        .catch(error => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
    
})
///////////////////////////////////////////////////////////// Get comment by id
router.get('/:id/comments', (req, res) => {
    db.findCommentById(req.params.id)
    .then(c => {
        if (!c){
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else if (c) {
            res.status(200).json(c)
        }
    })
})
/////////////////////////////////////////////////// Post
router.post('/', (req, res) => {    
   db.insert(req.body)
    .then((post) => {
        if (!req.body.title || !req.body.contents){ 
        res.status(400).json({errorMessage: "Please provide title and content for the post"})
        } else if (req.body.title && req.body.contents) { 
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
    let comment = req.body
    
    function isValidComment(comment) {
        return Boolean(comment.text && comment.post_id);
    }

    if(isValidComment(comment)){

        db.insertComment(comment)
        .then (post => {
            res.status(201).json({post})
        })
        .catch(error => {res.status(500).json({error: "There was an error while saving the post to the database."})})
    } else {res.status(400).json({errorMessage: "Please provide text and id for the comment."})}
})

    
//////////////////////////////////////////////// Delete
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(post => {
            if(post > 0){res.status(200).json({message: "The post has been deleted."})
            } else {res.status(404).json({message: "The post could not be found."})}
        })
        .catch( error => res.status(500).json({error: "The post could not be removed."}))
    
})
/////////////////////////////////////////////// Put


router.put('/:id', async (req, res) => { //any part of the object can be changed.
        const changes = req.body
        db.update(req.params.id, changes)
        let findId = await db.findById(req.params.id)
            
                if(findId  = 1 && req.body.title && req.body.contents){
                   try{
                       res.status(200).json(changes)
                    }                    
                   catch(error){res.status(500)}

                } else if (findId = 0){
                    res.status(404).json({message: "The post with the specified Id does not exist"})
                } else if (!req.body.title || !req.body.contents){
                    res.status(400).json({errorMessage: "Please provide title and content for the post"})
                } else res.status(500)
        })
/////////////////////////////////////////////////

module.exports = router;
