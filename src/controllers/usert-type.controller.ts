import { Request, Response } from 'express'
import { UserType } from '../model'

interface UserTypeBody {
  description: string
}

export const getUserTypes = async (req: Request, res: Response) => {
  try {
    const userType = await UserType.find()
    return res.json(userType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getUserType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userType = await UserType.findOneBy({ id })

    if (!userType)
      return res.status(404).json({ message: 'UserType not found' })

    return res.json(userType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createUserType = async (
  req: Request<unknown, unknown, UserTypeBody>,
  res: Response
) => {
  try {
    const { description } = req.body
    const userType = new UserType()

    userType.description = description

    await userType.save()
    return res.json(userType)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const updateUserType = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const userType = await UserType.findOneBy({ id })
    if (!userType)
      return res.status(404).json({ message: 'Not userType found' })

    await UserType.update({ id }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteUserType = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await UserType.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'UserType not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
