import connection from "../data/movie_db.js"; // Importa la connessione al database

// Funzione per ottenere tutti i film
function index(req, res) {
    const sql = 'SELECT * FROM movies'; // Query SQL per selezionare tutti i film

    connection.query(sql, (err, results) => { // Esegue la query al database
        if (err) // Se c'è un errore nella query
            return res.status(500).json({ // Risponde con un errore 500 (server error)
                error: 'Errore lato server INDEX function'
            });

        // res.json(results); // Restituisce i risultati della query come risposta JSON

        // Codice commentato che potrebbe essere usato per aggiungere il percorso immagine ai film
        const movies = results.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image,
            };
        });

        res.json(movies)
    });
}

// Funzione per ottenere un singolo film con le sue recensioni
function show(req, res) {
    const { id } = req.params; // Estrae l'ID del film dai parametri della richiesta

    const movieSql = 'SELECT * FROM movies WHERE id= ?'; // Query per ottenere il film specifico
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id= ?'; // Query per ottenere le recensioni del film

    connection.query(movieSql, [id], (err, results) => { // Esegue la query per ottenere il film
        if (err) // Se c'è un errore nella query
            return res.status(500).json({
                error: 'Errore lato server SHOW function',
            });

        if (results.length === 0) // Se il film non esiste
            return res.status(404).json({
                error: 'Movie not found',
            });

        const movie = results[0]; // Salva il primo (e unico) risultato della query

        // Esegue la query per ottenere le recensioni del film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) // Se c'è un errore nella query
                return res.status(500).json({
                    error: 'Errore lato server SHOW function',
                });

            movie.reviews = reviewsResults; // Aggiunge le recensioni al film

            // Codice commentato che potrebbe essere usato per aggiungere il percorso immagine al film
            res.json({
                ...movie,
                image: req.imagePath + movie.image,
            });

            // res.json(movie); // Restituisce il film con le recensioni in formato JSON
        });
    });
}

function storeReview(req, res) {

    const { id } = req.params

    const { text, name, vote } = req.body

    const sql = 'INSERT INTO reviews ( text, name, vote, movie_id ) VALUES (?,?,?,?)'

    connection.query(sql, [text, name, vote, id], (err, results) => {

        if (err)
            return res.status(500).json({
                error: 'Databse Errore StoreReview'
            })

            res.status(201)
            res.json({
                message: 'review Added',
                id: results.insertId,
            })
    })
}

function store(req, res){

    const { title, director, genre, release_year, abstract } = req.body

    const imageName = `${req.file.filename}`

    const sql = 'INSERT INTO movies (title, director, image, abstract) VALUES (?,?,?,?)'

    connection.query(sql, [title, director, genre, release_year, imageName, abstract], (err, results) => {
        if(err) return res.status(500).json({
            error: 'Database Errore Store'
        })

        res.status(201).json({
            status: 'success',
            message: 'Film inserito con successo',
            id: results.inserId
        })
    }) 
}

// Funzione per eliminare un film
function destroy(req, res) {
    const { id } = req.params; // Estrae l'ID del film dai parametri della richiesta

    const sql = 'DELETE FROM movies WHERE id = ?'; // Query per eliminare il film con l'ID specificato

    connection.query(sql, [id], (err) => { // Esegue la query di eliminazione
        if (err) // Se c'è un errore nella query
            return res.status(500).json({
                error: 'Errore lato server DESTROY function',
            });

        res.sendStatus(204); // Restituisce un codice 204 (No Content) per indicare che l'eliminazione è avvenuta con successo
    });
}

// Esporta le funzioni per essere usate in altri file
export {
    index,
    show,
    destroy,
    storeReview,
    store
};