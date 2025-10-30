import Expenses from '../models/expenses.model.js';
import Project from '../models/project.model.js';
import { categorizeExpense } from '../lib/openai.js';

export const getExpensesByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const expenses = await Expenses.find({ projectId });
        res.status(200).json({ ok: true, data: expenses });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const addExpense = async (req, res) => {
    const { projectId, title, amount } = req.body;
    if (!projectId || !title || !amount) {
        return res.status(400).json({ ok: false, error: 'Project ID, title, and amount are required' });
    }

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ ok: false, error: 'Project not found' });
        }

        const expense = new Expenses({ projectId, title, amount });
        expense.category = await categorizeExpense(expense.title);
        await expense.save();

        project.totalExpenses += amount;
        project.isOverBudget = project.totalExpenses > project.budget;

        if(project.isOverBudget) {
            sendEmail(project.name, project.budget, project.totalExpenses);
        }

        await project.save();
        res.status(201).json({ ok: true, data: expense });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expenses.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ ok: false, error: 'Expense not found' });
        }
        const project = await Project.findById(expense.projectId);
        if (!project) {
            return res.status(404).json({ ok: false, error: 'Associated project not found' });
        }
        project.totalExpenses -= expense.amount;
        project.isOverBudget = project.totalExpenses > project.budget;

        if(project.isOverBudget) {
            sendEmail(project.name, project.budget, project.totalExpenses);
        }

        await project.save();
        res.status(200).json({ ok: true, data: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

