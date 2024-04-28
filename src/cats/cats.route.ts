import {Cat} from "./cats.module";
import express, { Router, Request, Response } from "express";
import HttpError from "../error/http.error";

const router = Router();

//전체 고양이 불러오기
router.get(`/cats`, (req: Request, res: Response) => {
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
router.get(`/cats/:id`, (req: Request, res: Response) => {
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

// 특정 고양이 추가
router.post(`/cats`, (req: Request, res:Response) => {
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


export default router