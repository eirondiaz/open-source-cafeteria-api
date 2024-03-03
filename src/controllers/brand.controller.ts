import { Request, Response } from 'express'
import { Brand } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface BrandBody {
  description: string
}

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.find()
    return res.json(brand)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getSingleBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const brand = await Brand.findOneBy({ id })

    if (!brand) return res.status(404).json({ message: 'Brand not found' })

    return res.json(brand)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createBrand = async (
  req: Request<unknown, unknown, BrandBody>,
  res: Response
) => {
  const { description } = req.body
  const brand = new Brand()

  brand.description = description

  await brand.save()
  return res.json(brand)
}

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const brand = await Brand.findOneBy({ id })
    if (!brand) return res.status(404).json({ message: 'Not brand found' })
    const mBrand = new Brand()

    const body = req.body
    body.id = id

    await dbConfig.getRepository(Brand).save({
      ...body,
      ...mBrand,
    })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Brand.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Brand not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
