import express, { Router } from 'express';
import path from 'path';

interface Options {
    port : number;
    routes : Router;
    public_path?: string;
}


export class Server {

    private app = express();
    private readonly port: number
    private readonly public_path: string;
    private readonly routes : Router;

    constructor(options: Options) {
        const { port, routes, public_path='public' } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }
    
    
    async star() {


        
        //* use(express.json())
        //* Middleware: Son funciones que se ejecutan antes de llegar a las rutas, pueden modificar la req y res, o terminar la respuesta.
        //* Hay que parsear la info que viene de la request {BODY} y transformarla
        //* Cualquier peticion que pase por mi servidor pasa por este
        //* middleware y si viene el BODY lo serializa 
        //* como un OBJETO JSON

        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({extended:true})); // x-www-from-urlencode


        //* Public Folder
     
        this.app.use(express.static(this.public_path));
 
        //* Routes definir mis rutas
        this.app.use( this.routes )
        
        
        //* SPA router
        //* intercepta todas las request y emite una response
        this.app.get(/.*/, (req, res) => {
            //* Si no existe la peticion en la carpeta publica
            //* Hay que retornar el PATH  a nuestro index que tenemos en
            //* en la carpeta publica
            const indexPath = path.join(__dirname, `../../${this.public_path}/index.html`);
            //console.log( indexPath)
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, ()=>{
                console.log(`Server running on port: ${this.port}!`);
        })

    }
}