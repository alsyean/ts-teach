import { Router } from "express";
import * as service from './cats.service'

const router = Router();

//전체 고양이 불러오기
router.get(`/cats`, service.getAllCats)

// 특정 고양이 찾기
router.get(`/cats/:id`, service.getCats)

// 특정 고양이 추가
router.post(`/cats`, service.postCats)

// 특정 고양이 정보 수정
router.put(`/cats/:id`, service.updateCats)

// 특정 고양이 부분적 정보 수정
router.patch(`/cats/:id`, service.patchCats)

// 특정 고양이 삭제
router.delete(`/cats/:id`, service.deleteCats)


export default router