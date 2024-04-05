import { Router } from 'express'
import CampusRouter from './campus.routes'
import UserRouter from './user.routes'
import SupplierRouter from './supplier.routes'
import UserTypeRouter from './user-type.routes'
import CafeteriaRouter from './cafeteria.routes'
import BrandRouter from './brand.routes'
import ItemRouter from './item.routes'
import EmployeeRouter from './employee.routes'
import SaleRouter from './sale.routes'

const router = Router()

router.use('/cafeterias', CafeteriaRouter)
router.use('/campus', CampusRouter)
router.use('/users', UserRouter)
router.use('/suppliers', SupplierRouter)
router.use('/user-types', UserTypeRouter)
router.use('/brands', BrandRouter)
router.use('/items', ItemRouter)
router.use('/employees', EmployeeRouter)
router.use('/sales', SaleRouter)

export default router
