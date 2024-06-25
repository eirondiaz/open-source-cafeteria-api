import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Login } from '../model'; // Asegúrate de que tienes un modelo Login definido
import { AppDataSource as dbConfig } from '../db';

interface LoginBody {
  Loginname: string;
  password: string;
}

interface RegisterBody {
  Loginname: string;
  password: string;
  email: string;
}

const generateToken = (user: any) => {
  const token = jwt.sign(
    { id: user.id, Loginname: user.username },
    process.env.JWT_SECRET || 'secret', // Reemplaza 'secret' con una clave secreta fuerte y mantenla en tus variables de entorno
    { expiresIn: '1h' }
  );
  return token;
};

export const register = async (req: Request<unknown, unknown, RegisterBody>, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const existingLogin = await Login.findOneBy({ username });
    if (existingLogin) {
      return res.status(400).json({ message: 'username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const login = new Login();
    login.username = username;
    login.email = email;
    login.password = hashedPassword;

    await login.save();

    const token = generateToken(login);

    return res.status(201).json({ data: login, token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const login = async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    const login = await Login.findOneBy({ username });
    if (!login) {
      return res.status(404).json({ message: 'user not found' });
    }

    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(login);

    return res.json({ data: login, token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
