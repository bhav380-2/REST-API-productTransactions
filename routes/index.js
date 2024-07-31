import express from 'express'
import transactionRouter from './transactionRouter.js';
import FetchDataController from '../controllers/FetchDataController.js';

const fetchDataController = new FetchDataController();
const router = express.Router();


router.get('/init',fetchDataController.get);
router.use('/transactions',transactionRouter);


export default router;