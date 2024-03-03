import { Request, Response } from 'express'
import { Employee } from '../model'
import { AppDataSource as dbConfig } from '../db'

interface EmployeeBody {
  name: string
  cedula: string
  workShift: string
  admissionDate: string
  commissionPercentage: string
}

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find()
    return res.json(employees)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getSingleEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const employee = await Employee.findOneBy({ id })

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' })

    return res.json(employee)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createEmployee = async (
  req: Request<unknown, unknown, EmployeeBody>,
  res: Response
) => {
  const { name, cedula, workShift, admissionDate, commissionPercentage } =
    req.body
  const employee = new Employee()

  employee.name = name
  employee.cedula = cedula
  employee.workShift = workShift
  employee.admissionDate = admissionDate
  employee.commissionPercentage = commissionPercentage

  await employee.save()
  return res.json(employee)
}

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const brand = await Employee.findOneBy({ id })
    if (!brand) return res.status(404).json({ message: 'Not brand found' })
    const mBrand = new Employee()

    const body = req.body
    body.id = id

    await dbConfig.getRepository(Employee).save({
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

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Employee.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Employee not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
