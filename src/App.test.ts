import app from './App';
import supertest from 'supertest';

describe('Curso de docker Test con Container :D', () => {

    describe('Debug',() => {
        it(`Verifico que la app esta corriendo`, async ()=>{
            const respuestaSube = await supertest(app).get('/health');
            expect(respuestaSube.status).toBe(200);
            expect(respuestaSube.text).toBe('ok :D');
        });
    });

    describe('Punto Nro Uno 1 : Iniciando un contenedor docker',() => {
        it('Podes consultar el servicio de estado del servicio de sube',async () => {
            const respuestaSube = await supertest(app).get('/servicioSube');
            expect(respuestaSube.status).toBe(200);
            expect(respuestaSube.text).toBe(':)');
        });
    });

    describe('Punto Nro Dos 2 : Montando volumenes, viendo logs y usando el -c de un contenedor',() => {
        it(`Tiene que poder cargare 10 pesos a la tarjeta del usuario y registrarse en la base`, async ()=>{
            const datosUsuario = {
                monto: 10,
                numero: 112233446677,
                idUsuario: 200,
            }
            const respuestaSube = await supertest(app).post('/recargaSube').send(datosUsuario);
            expect(respuestaSube.status).toBe(200);
            expect(respuestaSube.text).toBe(':)');
         });

        it(`Tiene que romper ya que no se le puede carga la tarjeta del usuario 500`, async ()=>{
            const datosUsuario = {
                monto: 10,
                numero: 112233446677,
                idUsuario: 500,
            };
            let respuestaSube:any;
            try{
                respuestaSube = await supertest(app).post('/recargaSube').send(datosUsuario);
                fail("No tendria que llegar a este punto");
            }catch(error:any){
                expect(respuestaSube.status).toBe(500);
                expect(respuestaSube.text).toBe('Ups :(');
            }
         });
    });
});
