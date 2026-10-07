import express from 'express';

const app = express()
const PORT = 4000

app.get("/", (req,res) => {
    res.end("Mindstory is running!");
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} `)
})