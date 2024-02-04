import { Request, Response } from 'express'
import { Campus } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface CampusBody {
  description: string
}

export const getCampus = async (req: Request, res: Response) => {
  try {
    const campus = await Campus.find()
    return res.json(campus)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getSingleCampus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await Campus.findOneBy({ id })

    if (!user) return res.status(404).json({ message: 'Campus not found' })

    return res.json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createCampus = async (
  req: Request<unknown, unknown, CampusBody>,
  res: Response
) => {
  const { description } = req.body
  const campus = new Campus()

  campus.description = description

  await campus.save()
  return res.json(campus)
}

export const updateCampus = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const campus = await Campus.findOneBy({ id })
    if (!campus) return res.status(404).json({ message: 'Not campus found' })
    const nCampus = new Campus()

    const body = req.body
    body.id = id

    await dbConfig.getRepository(Campus).save({
      ...body,
      ...nCampus,
    })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteCampus = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Campus.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Campus not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
