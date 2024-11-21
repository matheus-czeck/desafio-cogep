import { Request, Response } from 'express';
import { loginUser, registerUser } from '../service/auth.service';


export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log(`Tentando login para o email: ${email}`);

  try {
    const { token, user } = await loginUser(email, password);

    console.log('Login bem-sucedido');
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Erro ao fazer login:', error instanceof Error ? error.message : error);

    res.status(401).json({
      message: error instanceof Error ? error.message : 'Erro ao autenticar usuário.',
    });
  }
};


export const registerController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const newUser = await registerUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrnar usuário:', error instanceof Error ? error.message : error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao registrar usuário.' });
  }
};
