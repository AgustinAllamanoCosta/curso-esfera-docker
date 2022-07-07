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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pack = require('../package.json');
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.route('/health').get((req, res) => {
            return res.status(200).send('ok :D');
        });
        this.app.route('/recargaSube').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const informacionDeRecarga = {
                    montoACargar: req.body.monto,
                    numerDeTarjeta: req.body.numero,
                    idDeUsuario: req.body.idUsuario,
                };
                const respuesta = yield this.ejecutarPeticion(informacionDeRecarga);
                return res.status(200).send(':)');
            }
            catch (error) {
                console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                return res.status(500).send('Ups :(');
            }
        }));
        this.app.route('/recargaSube').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const informacionDeRecarga = {
                    idDeTransaccion: req.query.idDeTransaccion
                };
                const respuesta = yield this.ejecutarPeticion(informacionDeRecarga);
                return res.status(200).send(':)');
            }
            catch (error) {
                console.log(`NOOOO DONDE TE SENTASTE ! => ${JSON.stringify(error)}`);
                return res.status(500).send('Ups :(');
            }
        }));
        this.app.route('/tarjetaSube').post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const informacionDeRecarga = {
                    numerDeTarjeta: req.body.numero,
                    idDeUsuario: req.body.idUsuario,
                };
                return res.status(200).send(':)');
            }
            catch (error) {
                console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                return res.status(500).send('Ups :(');
            }
        }));
        this.app.route('/tarjetaSube').get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const informacionDeRecarga = {
                    numerDeTarjeta: req.body.numero,
                    idDeUsuario: req.body.idUsuario,
                };
                return res.status(200).send(':)');
            }
            catch (error) {
                console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                return res.status(500).send('Ups :(');
            }
        }));
    }
    ejecutarPeticion(peticion) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield axios.post(process.env.SUBE_URL, peticion);
            return respuesta;
        });
    }
}
exports.default = new App().app;
