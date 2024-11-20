"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/authRoutes/auth.routes"));
const database_1 = __importDefault(require("./config/database"));
const peopleRoutes_1 = __importDefault(require("./routes/peopleRoutes/peopleRoutes"));
const activitiesRoutes_1 = __importDefault(require("./routes/activitieRoutes/activitiesRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rotas
app.use('/auth', auth_routes_1.default);
app.use('/pessoas', peopleRoutes_1.default);
app.use(express_1.default.json());
app.use('/atividades', activitiesRoutes_1.default);
// Sincronizar banco de dados
database_1.default
    .sync()
    .then(() => console.log('Banco de dados sincronizado com sucesso!'))
    .catch((err) => console.error('Erro ao sincronizar banco de dados:', err));
// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
