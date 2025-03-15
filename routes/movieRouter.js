import express from 'express'
import { index, show, destroy } from '../controllers/movieController.js'
const router = express()

//index
//localhost:3000/api/movies
router.get('/', index);

//show
//localhost:3000/api/movies/:id
router.get('/:id', show);

//destroy
//localhost:3000/api/movies/:id
router.delete('/:id', destroy);

export default router
