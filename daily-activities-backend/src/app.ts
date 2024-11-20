import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes/auth.routes';
import sequelize from './config/database';
import peopleRoutes from './routes/peopleRoutes/peopleRoutes';
import activitiesRoutes from './routes/activitieRoutes/activitiesRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/pessoas', peopleRoutes);
app.use(express.json());
app.use('/atividades', activitiesRoutes); 

// Sincronizar banco de dados
sequelize
  .sync({ force: true })
  .then(() => console.log('Banco de dados sincronizado com sucesso!'))
  .catch((err) => console.error('Erro ao sincronizar banco de dados:', err));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
