import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';
import authRoutes from './routes/auth.routes';
import atividadesRoutes from './routes/atividades.routes'
import pessoasRoutes from './routes/pessoas.routes'

const app = express();

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/atividades', atividadesRoutes);
app.use('/pessoas', pessoasRoutes);

// Testa a conexão com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado!');
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
