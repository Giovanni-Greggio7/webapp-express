// Importazione della connessione al database
import connection from "./data/movie_db.js";
import cors from 'cors'

// Importazione di Express, il framework per creare API e server web
import express from 'express';

// Creazione di un'istanza di Express
const app = express();

// Impostazione della porta del server: usa la variabile d'ambiente SERVER_PORT oppure 3000 come valore di default
const port = process.env.SERVER_PORT || 3000;

// Importazione del router per la gestione delle API sui film
import movieRouter from './routes/movieRouter.js';

// Importazione del middleware per gestire i percorsi delle immagini
import imagePathMiddleware from './middlewares/imagePath.js';

// Middleware cors
app.use(
    cors({
        origin: process.env.FRONTEND_APP,
    })
)

// Configurazione per servire file statici dalla cartella "public"
app.use(express.static('public'));

// Middleware per abilitare la gestione dei dati in formato JSON nelle richieste
app.use(express.json());

// Applicazione del middleware per gestire i percorsi delle immagini
app.use(imagePathMiddleware);

// Definizione della route principale per verificare che il server sia attivo
app.get('/', (req, res) => {
    res.send('Server Movie tutto a posto'); // Risponde con un messaggio di conferma
});

// Assegna tutte le rotte che iniziano con "/movie" al movieRouter
app.use('/movie', movieRouter);

// Avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Server Movie in funzione sulla porta: ${port}`);
});
