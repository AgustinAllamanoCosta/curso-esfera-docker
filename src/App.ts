import express,{ Request, Response } from 'express';
import axios from 'axios';
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
        this.pdClient.connect();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.route('/health').get(
            (req: Request, res: Response) => {
                return res.status(200).send('ok :D');
             }
        );
        
        this.app.route('/servicioSube').get(
            async (req: Request, res: Response) => {
                try{
                    const respuesta =  await axios.get(process.env.SERVICIO_SUBE_URL as string);
                    return res.status(respuesta.status).send(':)');
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );

        this.app.route('/recargaSube').post(
            async (req: Request, res: Response) => {
                let status = 500;
                let message:any = 'Ups :(';
                try{
                    const informacionDeRecarga = {
                        montoACargar: req.body.monto,
                        numerDeTarjeta: req.body.numero,
                        idDeUsuario: req.body.idUsuario,
                    };
                    const respuesta:any =  await axios.post(process.env.SUBE_URL as string,informacionDeRecarga);
                    const query = `INSERT INTO transacciones_sube(
                        numero_de_tarjeta, id_de_transaccion)
                        VALUES ('${req.body.numero}','${respuesta.data.idTransaccion}')`;
                        await this.ejecutarConsultaBase(query);
                    status = respuesta.status;
                    message =  ':)';
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                }finally{
                    return res.status(status).send(message);
                }
             }
        );
        
        this.app.route('/recargaSube').get(
            async (req: Request, res: Response) => {
                let status = 500;
                let message:any = ':(';
                try{
                    const query = `SELECT * FROM transacciones_sube WHERE id_de_transaccion = ${req.query.idDeTransaccion}`;
                    const respuestaBase = await this.ejecutarConsultaBase(query);
                   status = 200;
                   message = respuestaBase;
                }catch(error:any){
                    console.log(`NOOOO DONDE TE SENTASTE ! => ${JSON.stringify(error)}`);
                }finally{
                    return res.status(status).send(message);
                }
             }
        );
   }

    private async ejecutarConsultaBase(query:string){
        console.log("ejecutando consulta en la base");
        return this.pdClient.query(query, (err:any, res:any) => {
        if (err){
            console.error(err);
            this.pdClient.end();
            throw err;
        } 
        this.pdClient.end();
        return res;
        })
    }
}
export default new App().app;
