import { Router } from 'express'
import {
  getCampus,
  getSingleCampus,
  createCampus,
  updateCampus,
  deleteCampus,
} from '../controllers/campus.controller'

const router = Router()

router.get('/', getCampus)
router.get('/:id', getSingleCampus)
router.post('/', createCampus)
router.put('/:id', updateCampus)
router.delete('/:id', deleteCampus)

export default router
