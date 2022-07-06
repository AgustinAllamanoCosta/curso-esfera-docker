import app from './App';

const port = process.env.SERVER_PORT;
    console.log('Server corriendo en puerto ',port)
    app.listen(port);
