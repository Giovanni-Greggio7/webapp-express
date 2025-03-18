// Importazione di Express, il framework per la creazione di API e server web
import express from 'express';

// Importazione delle funzioni controller per gestire le richieste sui film
import { index, show, destroy } from '../controllers/movieController.js';

// Creazione di un'istanza di Express per gestire le route
const router = express();

// Rotta per ottenere tutti i film
// Esempio di utilizzo: GET http://localhost:3000/movies
router.get('/', index);

// Rotta per ottenere un singolo film tramite il suo ID
// Esempio di utilizzo: GET http://localhost:3000/movies/:id
router.get('/:id', show);

// Rotta per eliminare un film tramite il suo ID
// Esempio di utilizzo: DELETE http://localhost:3000/movies/:id
router.delete('/:id', destroy);

// Esportazione del router per essere utilizzato nel server principale
export default router;
