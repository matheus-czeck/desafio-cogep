"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../services/middlewares/auth.middleware");
const people_1 = require("../../models/people");
const activities_1 = require("../../models/activities");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield people_1.People.findAll();
        console.log("Lista de pessoas retornada:", people);
        res.json(people);
    }
    catch (err) {
        console.error("Erro ao obter pessoas:", err);
        res.status(500).json({ error: "Erro ao obter pessoas." });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const people = yield people_1.People.findByPk(id, {
            include: [
                {
                    model: activities_1.Activities,
                    as: "atividadesPessoa",
                },
            ],
        });
        if (!people) {
            return res.status(404).json({ error: "Pessoa não encontrada" });
        }
        res.json(people);
    }
    catch (err) {
        console.error("Erro ao obter detalhes da pessoa:", err);
        res.status(500).json({ error: "Erro ao obter detalhes da pessoa." });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, address } = req.body;
    try {
        console.log("Dados recebidos no backend:", req.body);
        const novaPessoa = yield people_1.People.create({
            name,
            phone,
            email,
            address: JSON.stringify(address),
        });
        res.status(201).json(novaPessoa);
    }
    catch (err) {
        res.status(400).json({ error: "Erro ao criar pessoa" });
    }
}));
exports.default = router;
