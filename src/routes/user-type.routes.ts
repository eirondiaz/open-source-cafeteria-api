import { Router } from 'express'
import {
  getUserTypes,
  getUserType,
  createUserType,
  updateUserType,
  deleteUserType,
} from '../controllers/usert-type.controller'

const router = Router()

router.get('/', getUserTypes)
router.get('/:id', getUserType)
router.post('/', createUserType)
router.put('/:id', updateUserType)
router.delete('/:id', deleteUserType)

export default router
