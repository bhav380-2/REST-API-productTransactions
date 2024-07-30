import express from 'express'
import CategoryController from '../controllers/CategoryController.js';

const categoryController = new CategoryController();

const router = express.Router();

router.get('/',categoryController.get);

export default router;