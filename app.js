//pacchetti da importare
import connection from "./data/movie_db.js";
import express from 'express';

//impostiamo express e la porta del server
const app = express()
const port = process.env.SERVER_PORT || 3000

import movieRouter from './routes/movieRouter.js'

app.use( '/movie' , movieRouter)

app.use(express.json())

app.get( '/', (req, res) => {
    res.send( 'Server Movie tutto a posto')
})

//attivazione del server
app.listen(port, () => {
    console.log(`Server Movie in funzione sulla porta: ${port}`)
})
