import { Employee } from './../model/Employee'
import { Campus } from '../model/Campus'
import { Request, Response } from 'express'
import { Item, Sale, User } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface SaleBody {
  comment: string
  units: number
  itemId: string
  userId: string
  employeeId: string
}

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find({
      relations: ['itemId', 'itemId.brandId', 'userId', 'employeeId'],
    })
    return res.json(sales)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const sale = await Sale.findOneBy({ id })

    if (!sale) return res.status(404).json({ message: 'Sale not found' })

    return res.json(sale)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createSale = async (
  req: Request<unknown, unknown, SaleBody>,
  res: Response
) => {
  const { comment, units, itemId, userId, employeeId } = req.body
  const sale = new Sale()

  const user = await User.findOneBy({ id: userId })
  if (!user) return res.status(400).json({ msg: 'user not found' })

  const employee = await Employee.findOneBy({ id: employeeId })
  if (!employee) return res.status(400).json({ msg: 'employee not found' })

  const item = await Item.findOneBy({ id: itemId })
  if (!item) return res.status(400).json({ msg: 'item not found' })

  sale.comment = comment
  sale.units = units
  sale.itemId = item
  sale.userId = user
  sale.employeeId = employee

  await sale.save()
  return res.json(sale)
}

export const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const sale = await Sale.findOneBy({ id })
    if (!sale) return res.status(404).json({ message: 'Not sale found' })
    const nSale = new Sale()

    const item = await Item.findOneBy({ id: req.body.itemId })
    if (!item) return res.status(400).json({ msg: 'item not found' })

    const user = await User.findOneBy({ id: req.body.userId })
    if (!user) return res.status(400).json({ msg: 'user not found' })

    const employee = await Employee.findOneBy({ id: req.body.employeeId })
    if (!employee) return res.status(400).json({ msg: 'employee not found' })

    const body = req.body
    body.id = id
    body.itemId = item
    body.userId = user
    body.employeeId = employee

    await dbConfig.getRepository(Sale).save({
      ...body,
      ...nSale,
    })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteSale = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Sale.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Sale not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
