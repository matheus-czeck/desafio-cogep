"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const atividades_routes_1 = __importDefault(require("./routes/atividades.routes"));
const pessoas_routes_1 = __importDefault(require("./routes/pessoas.routes"));
const app = (0, express_1.default)();
database_1.default.sync()
    .then(() => {
    console.log('Banco de dados sincronizado!');
})
    .catch((err) => {
    console.error('Erro ao sincronizar banco de dados:', err);
});
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rotas
app.use('/auth', auth_routes_1.default);
app.use('/atividades', atividades_routes_1.default);
app.use('/pessoas', pessoas_routes_1.default);
// Testa a conexão com o banco de dados
database_1.default.sync().then(() => {
    console.log('Banco de dados sincronizado!');
});
// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
