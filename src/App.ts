import express,{ Request, Response } from 'express';
const pack = require('../package.json');

class App {
   public app: express.Application;

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
                    const respuesta = await this.ejecutarPeticion(informacionDeRecarga);
                    return res.status(200).send(':)');
                }catch(error:any){
                    console.log(`ROMPE PEPE ROMPEEEEE => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );
        
        this.app.route('/recargaSube').get(
            async (req: Request, res: Response) => {
                try{
                    const informacionDeRecarga = {
                        idDeTransaccion: req.query.idDeTransaccion
                    };
                    const respuesta = await this.ejecutarPeticion(informacionDeRecarga);
                    return res.status(200).send(':)');
                }catch(error:any){
                    console.log(`NOOOO DONDE TE SENTASTE ! => ${JSON.stringify(error)}`);
                    return res.status(500).send('Ups :(');
                }
             }
        );

        this.app.route('/tarjetaSube').post(
            async (req: Request, res: Response) => {
                try{
                    const informacionDeRecarga = {
                        numerDeTarjeta: req.body.numero,
                        idDeUsuario: req.body.idUsuario,
                    };                    
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
                    const informacionDeRecarga = {
                        numerDeTarjeta: req.body.numero,
                        idDeUsuario: req.body.idUsuario,
                    }; 
                    
                    return res.status(200).send(':)');
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
}
export default new App().app;
