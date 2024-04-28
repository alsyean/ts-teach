import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();
const port : number = 8000;

// 커스텀 에러 클래스 정의


// express가 json을 읽을 수 있게 Middleware
app.use(express.json())

app.use(catsRouter);

app.use( (req, res, next ) => {
    console.log(` this is error middle ware`);
    res.send( {err: `404 not found error`})
})

app.listen(port, () => {
    console.log('server start')
})
