import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';

export const registerUser = async (email: string, password: string) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }
  

    const hashedPassword = await bcrypt.hash(password, 10);
  
    return await User.create({ email, password: hashedPassword });
  };

export const loginUser = async (email: string, password: string) => {
    console.log(`Tentando login para o email: ${email}`);
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.log(`Usuário não encontrado no banco de dados: ${email}`);
      throw new Error('Usuário não encontrado');
    }
  
    console.log(`Usuário encontrado: ${user.email}`);
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Senha válida: ${isPasswordValid}`);
  
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    console.log(`Token gerado: ${token}`);
    
    return { token, user };
  };
  