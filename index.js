const express = require('express') //import express

const postsRouter = require('./posts/postsRouter') // import router

const server = express() //setup server

server.use(express.json()) // teach server json



//set up our endpoints.

server.use('/api/posts', (req, res) => {
    res.send ('<h1>Posts</h1>')
})

server.get('/', (req, res) => {
    res.send('<h1> Post API </h>')
})





server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
})