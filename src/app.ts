import * as express from "express";
import catsRouter from "./cats/cats.route";
import e from "express";

const app: express.Express = express();
const port : number = 8000;

class Server {

    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }

    private setRoute () {
        this.app.use(catsRouter);
    }

    private setMiddleware (){
        // express가 json을 읽을 수 있게 Middleware
        app.use(express.json())

        this.setRoute();

        app.use( (req, res, next ) => {
            console.log(` this is error middle ware`);
            res.send( {err: `404 not found error`})
        })
    }

    public listen () {
        this.setMiddleware();
        this.app.listen(port, () => {
            console.log('server start')
        })
    }
}

function init() {
    const server = new Server();
    server.listen();
}

init()




