import express from 'express';
import { addExpense, getExpensesByProject, deleteExpense } from '../controllers/expenses.controller.js';

const router = express.Router();

router.get('/:projectId', getExpensesByProject);
router.post('/', addExpense);
router.delete('/:id', deleteExpense);

export default router;
