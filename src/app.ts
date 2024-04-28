import * as express from "express";
import { Cat, CatType} from "./app.module";

const app: express.Express = express();
const port : number = 8000;

// 커스텀 에러 클래스 정의
class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

// express가 json을 읽을 수 있게 Middleware
app.use(express.json())


//전체 고양이 불러오기
app.get(`/cats`, (req: express.Request, res: express.Response) => {
    try {
        let cats: any = Cat;
        res.status(200).send( {
            success: true,
            data : cats
        })

    } catch ( error ) {
        if (error instanceof HttpError) {
            res.status(error.status).send({
                success: false,
                error: error.message
            });
        } else {
            // 예상치 못한 에러 처리
            res.status(500).send({
                success: false,
                error: "Internal Server Error"
            });
        }
    }

})

// 특정 고양이 찾기
app.get(`/cats/:id`, (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        let cats = Cat.find( (v) => {
            return v.id === id
        })

        res.status(200).send( {
            success: true,
            data : cats
        })

    } catch ( error ) {
        if (error instanceof HttpError) {
            res.status(error.status).send({
                success: false,
                error: error.message
            });
        } else {
            // 예상치 못한 에러 처리
            res.status(500).send({
                success: false,
                error: "Internal Server Error"
            });
        }
    }

})

app.post(`/cats`, (req: express.Request, res:express.Response) => {
    const data = req.body;

    try {

        let catId =  Cat.find( (v) => v.id === data.id);

        if (catId === undefined ) {
            Cat.push(data)
        } else {
            let errorMessage  = `${catId.id} is already`
            throw  new HttpError(errorMessage, 500)
        }

        res.status(201).send({
            success: true,
            data : data
        })

    } catch ( error ) {
        if (error instanceof HttpError) {
            res.status(error.status).send({
                success: false,
                error: error.message
            });
        } else {
            // 예상치 못한 에러 처리
            res.status(500).send({
                success: false,
                error: "Internal Server Error"
            });
        }
    }

})

app.use( (req, res, next ) => {
    console.log(` this is error middle ware`);
    res.send( {err: `404 not found error`})
})

app.listen(port, () => {
    console.log('server start')
})
