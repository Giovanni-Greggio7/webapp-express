// Importazione del pacchetto mysql2 per connettersi al database
import mysql from 'mysql2';

// Creazione della connessione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Indirizzo del server del database (di default 'localhost' se non specificato nelle variabili d'ambiente)
    user: process.env.DB_USER || 'root', // Nome utente per accedere al database (di default 'root')
    password: process.env.DB_PASSWORD || '', // Password dell'utente del database (vuota di default)
    database: process.env.DB_NAME // Nome del database da utilizzare
});

// Connessione al database
connection.connect((err) => {
    if (err) throw err; // Se si verifica un errore durante la connessione, viene generato un errore
    console.log('Connessione al DB avvenuta con successo'); // Messaggio di conferma se la connessione ha successo
});

// Esportazione della connessione per essere utilizzata in altri file
export default connection;