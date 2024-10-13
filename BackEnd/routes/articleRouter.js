import express from "express";
import { addArticle } from '../controllers/articleController.js'; 
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/articles', authenticateToken, addArticle);

export default router;
