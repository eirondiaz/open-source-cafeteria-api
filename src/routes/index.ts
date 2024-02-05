import { Router } from 'express'
import CampusRouter from './campus.routes'
import UserRouter from './user.routes'
import SupplierRouter from './supplier.routes'
import UserTypeRouter from './user-type.routes'

const router = Router()

router.use('/campus', CampusRouter)
router.use('/users', UserRouter)
router.use('/suppliers', SupplierRouter)
router.use('/user-types', UserTypeRouter)

export default router
