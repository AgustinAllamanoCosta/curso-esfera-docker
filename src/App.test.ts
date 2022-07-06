import app from '../../App';
import supertest from 'supertest';

describe('Curso de docker', () => {
    describe('Puto Nro Uno',() => {
        it(`Se tendra que poder realizar una recarga de una tarjeta sube cuando
         se pasa un numero de tarjeta, un monto y un id de usuario`,()=>{});
        
        it(`Se tendra en caso de que el endpoint de sube responda un 412 se tandra que 
         responde el msj no se pudo realizar la recarga`,()=>{});

        it(`En caso de que el endpoint de sube responde 500 se tendra que responder que 
         vuelva a intentar mas tarde, el servicio no esta disponible`,()=>{});
    });

    describe('Puto Nro Dos',() => {
        it(`Cuando se ejecute una recarga se tendra que poder guardar en la base de datos
            el id de usuario, tarjeta y el id de transaccion de sube`,()=>{});
        
        it(`En caso de que sube responde un 412 se quiere guardar ese intento de recargar
            en una tabla de la base de datos`,()=>{});

        it(`En caso de consultar por una recarga se que exista en la base de datos`,()=>{});
    });

    describe('Puto Nro Tres',() => {
        it(`Realizar un CRUD de tarjetas donde se pueda realizar el alta de una tarjeta por id de 
        usuario y numero de tarjeta`,()=>{});
    });

});
