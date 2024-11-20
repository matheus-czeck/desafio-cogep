import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;


    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'E-mail já registrado' });
      return;
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
  } catch (error) {
    next(error); 
  }
});

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';

router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Senha incorreta' });
      return;
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error); 
  }
});

export default router;
