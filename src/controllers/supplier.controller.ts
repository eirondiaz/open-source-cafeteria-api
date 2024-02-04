import { Request, Response } from 'express'
import { Supplier } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface SupplierBody {
  comercialName: string
  rnc: string
}

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.find()
    return res.json(supplier)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await Supplier.findOneBy({ id })

    if (!user) return res.status(404).json({ message: 'Supplier not found' })

    return res.json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createSupplier = async (
  req: Request<unknown, unknown, SupplierBody>,
  res: Response
) => {
  try {
    const { comercialName, rnc } = req.body
    const supplier = new Supplier()

    supplier.comercialName = comercialName
    supplier.rnc = rnc

    await supplier.save()
    return res.json(supplier)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const updateSupplier = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const supplier = await Supplier.findOneBy({ id })
    if (!supplier)
      return res.status(404).json({ message: 'Not supplier found' })
    const nSupplier = new Supplier()

    const body = req.body
    body.id = id

    await dbConfig.getRepository(Supplier).save({
      ...body,
      ...nSupplier,
    })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Supplier.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Supplier not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
