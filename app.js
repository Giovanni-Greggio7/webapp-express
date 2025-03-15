//pacchetti da importare
import connection from "./data/movie_db.js";
import express from 'express';

//impostiamo express e la porta del server
const app = express()
const port = process.env.SERVER_PORT || 3000

import movieRouter from './routes/movieRouter.js'
import imagePathMiddleware from './middlewares/imagePath.js';

app.use( express.static('public') )

app.use(express.json())

app.use( imagePathMiddleware )

app.get( '/', (req, res) => {
    res.send( 'Server Movie tutto a posto')
})

app.use( '/movie' , movieRouter)

//attivazione del server
app.listen(port, () => {
    console.log(`Server Movie in funzione sulla porta: ${port}`)
})
