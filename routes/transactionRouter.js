import express from 'express'
import TransactionController from '../controllers/TransactionController.js';

const transactionController = new TransactionController();

const router = express.Router();

router.get('/',transactionController.get);
router.get('/stats',transactionController.stats);

router.get('/barchart',transactionController.barChart);

router.get('/piechart',transactionController.pieChart);

router.get('/combine',transactionController.combine);

export default router;