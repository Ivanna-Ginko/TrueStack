import { Router } from "express";
import { getArticlesController } from "../controllers/articles.js";


const router = Router();

router.get('/', getArticlesController);
router.get('/:articleId', getArticlesController);
router.post('/', getArticlesController);
router.patch('/:articleId', getArticlesController);
router.delete('/:articleId', getArticlesController);




export default router;
