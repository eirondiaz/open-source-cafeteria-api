import { Router } from 'express'
import {
  getCafeterias,
  getCafeteria,
  createCafeteria,
  updateCafeteria,
  deleteCafeteria,
} from '../controllers/cafeteria.controller'

const router = Router()

router.get('/', getCafeterias)
router.get('/:id', getCafeteria)
router.post('/', createCafeteria)
router.put('/:id', updateCafeteria)
router.delete('/:id', deleteCafeteria)

export default router
