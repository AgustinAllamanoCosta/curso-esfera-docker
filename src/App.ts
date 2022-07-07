import express,{ Request, Response } from 'express';
import axios from 'axios';
const pack = require('../package.json');
const { Client } = require('pg')

class App {
   public app: express.Application;
   private pdClient = new Client({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            })

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.route('/health').get(
            (req: Request, res: Response) => {
                return res.status(200).send('ok :D');
             }
        );
        this.app.route('/recargaSube').post(
            async (req: Request, res: Response) => {
                try{
                    const informacionDeRecarga = {
                        montoACargar: req.body.monto,
                        numerDeTarjeta: req.body.numero,
                        idDeUsuario: req.body.idUsuario,
                    };
                    const respuesta:any = await this.ejecutarPeticion(informacionDeRecarga);
                    const query = `INSERT INTO transacciones_sube(
                        numero_de_tarjeta, id_de_transaccion)
                        VALUES ('${req.body.numero}',${respuesta.idTransaccion};`;
                    this.ejecutarConsultaBase(query);
                    return res.status(respuesta.status).send(':)');
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );
        
        this.app.route('/recargaSube').get(
            async (req: Request, res: Response) => {
                try{
                    const query = `SELECT * FROM transacciones_sube WHERE id_de_transaccion = ${req.query.idDeTransaccion}`;
                    const respuestaBase = this.ejecutarConsultaBase(query);
                    return res.status(200).send(respuestaBase);
                }catch(error:any){
                    console.log(`NOOOO DONDE TE SENTASTE ! => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );

        this.app.route('/tarjetaSube').post(
            async (req: Request, res: Response) => {
                try{
                    const query = `INSERT INTO tarjetas_sube(
                        numero_de_tarjeta, id_de_usuario)
                        VALUES ('${req.body.numero}',${req.body.idUsuario};`;
                    this.ejecutarConsultaBase(query);
                    return res.status(200).send(':)');
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );

        this.app.route('/tarjetaSube').get(
            async (req: Request, res: Response) => {
                try{
                    const query = `SELECT * FROM tarjetas_sube WHERE id_de_usuario = ${req.body.idUsuario};`;
                    const respuesBase = this.ejecutarConsultaBase(query);
                    return res.status(200).send(respuesBase);
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );
   }

   private async ejecutarPeticion(peticion:any){
        const respuesta =  await axios.post(
        process.env.SUBE_URL as string,
        peticion);
        return respuesta;
    }

    private async ejecutarConsultaBase(query:string){
        this.pdClient.connect()
        return this.pdClient.query(query, (err:any, res:any) => {
        if (err){
            console.error(err);
            throw err;
        } 
        console.log(res)
        this.pdClient.end()
        return res;
        })
    }
}
export default new App().app;
