import { Campus } from './../model/Campus'
import { Request, Response } from 'express'
import { Cafeteria } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface CafeteriaBody {
  description: string
  encargado: string
  campusId: string
}

export const getCafeterias = async (req: Request, res: Response) => {
  try {
    const cafeterias = await Cafeteria.find()
    return res.json(cafeterias)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getCafeteria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const cafeteria = await Cafeteria.findOneBy({ id })

    if (!cafeteria)
      return res.status(404).json({ message: 'Cafeteria not found' })

    return res.json(cafeteria)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createCafeteria = async (
  req: Request<unknown, unknown, CafeteriaBody>,
  res: Response
) => {
  const { description, encargado, campusId } = req.body
  const cafeteria = new Cafeteria()

  const campus = await Campus.findOneBy({ id: campusId })

  if (!campus) return res.status(400).json({ msg: 'campus not found' })

  cafeteria.description = description
  cafeteria.encargado = encargado
  cafeteria.campusId = campus

  await cafeteria.save()
  return res.json(cafeteria)
}

export const updateCafeteria = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const cafeteria = await Cafeteria.findOneBy({ id })
    if (!cafeteria)
      return res.status(404).json({ message: 'Not cafeteria found' })
    const nCafeteria = new Cafeteria()

    const campus = await Campus.findOneBy({ id: req.body.campusId })

    if (!campus) return res.status(400).json({ msg: 'campus not found' })

    const body = req.body
    body.id = id
    body.campusId = campus

    await dbConfig.getRepository(Cafeteria).save({
      ...body,
      ...nCafeteria,
    })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteCafeteria = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Cafeteria.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Cafeteria not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
