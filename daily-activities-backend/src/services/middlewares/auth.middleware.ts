import { Request, Response, NextFunction} from 'express';
import { registerUser, loginUser } from '../service/auth.service';
import  jwt  from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded; // Adicione o tipo adequado ao Request se necessário
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const newUser = await registerUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Erro ao registrar usuário' });
    }
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: 'Erro ao autenticar usuário' });
    }
  }
};
