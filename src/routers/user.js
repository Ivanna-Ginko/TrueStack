import { Router } from "express";
import { getArticlesController } from "../controllers/articles.js";


const router = Router();

router.get('/', getArticlesController);
router.get('/favouritearticles', getArticlesController);
router.get('/postedarticles', getArticlesController);
router.put('/savearticle', getArticlesController);
router.delete('/deletefavourite', getArticlesController);




export default router;
