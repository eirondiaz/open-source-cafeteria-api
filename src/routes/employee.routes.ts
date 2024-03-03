import { Router } from 'express'
import {
  getEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller'

const router = Router()

router.get('/', getEmployees)
router.get('/:id', getSingleEmployee)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router
