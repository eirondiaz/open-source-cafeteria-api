import { Router } from 'express'
import CampusRouter from './campus.routes'
import UserRouter from './user.routes'
import SupplierRouter from './supplier.routes'

const router = Router()

router.use('/campus', CampusRouter)
router.use('/users', UserRouter)
router.use('/suppliers', SupplierRouter)

export default router
