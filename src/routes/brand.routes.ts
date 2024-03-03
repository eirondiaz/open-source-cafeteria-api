import { Router } from 'express'
import { getBrands, getSingleBrand, createBrand, updateBrand, deleteBrand } from './../controllers/brand.controller'

const router = Router()

router.get('/', getBrands)
router.get('/:id', getSingleBrand)
router.post('/', createBrand)
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)

export default router
