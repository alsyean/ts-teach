import * as express from "express";
import { Cat, CatType} from "./app.module";

const app: express.Express = express();
const port : number = 8000;

app.use( (req, res, next ) => {
    console.log(`middle ware`);
    next();
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.send({ cats: Cat});
})

app.get('/cat/blue', (req: express.Request, res: express.Response) => {
    res.send({ cats: Cat[0]});
})

app.use( (req, res, next ) => {
    console.log(` this is error middle ware`);
    res.send( {err: `404 not found error`})
})

app.listen(port, () => {
    console.log('server start')
})
