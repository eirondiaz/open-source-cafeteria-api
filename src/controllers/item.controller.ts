import { Request, Response } from 'express'
import { Brand, Item, Supplier } from '../model'

interface ItemBody {
  description: string
  cost: number
  stock: number
  brandId: string
  supplierId: string
}

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find()
    return res.json(items)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const item = await Item.findOneBy({ id })

    if (!item) return res.status(404).json({ message: 'Item not found' })

    return res.json(item)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createItem = async (
  req: Request<unknown, unknown, ItemBody>,
  res: Response
) => {
  const { description, cost, stock, brandId, supplierId } = req.body
  const item = new Item()

  const brand = await Brand.findOneBy({ id: brandId })
  const supplier = await Supplier.findOneBy({ id: supplierId })

  item.description = description
  item.cost = cost
  item.stock = stock
  item.brandId = brand || new Brand()
  item.supplierId = supplier || new Supplier()

  await item.save()
  return res.json(item)
}

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const item = await Item.findOneBy({ id })
    if (!item) return res.status(404).json({ message: 'Not item found' })

    await Item.update({ id }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Item.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Item not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
