import Project from '../models/project.model.js';

export const createProject = async (req, res) => {
    const { name, budget } = req.body;
    if (!name || !budget) {
        return res.status(400).json({ ok: false, error: 'Name and budget are required' });
    }

    const existingProject = await Project.findOne({ name });
    if (existingProject) {
        return res.status(400).json({ ok: false, error: 'Project with this name already exists' });
    }

    const project = new Project({ name, budget, totalExpenses: 0, isOverBudget: false });
    try {
        await project.save();
        res.status(201).json({ ok: true, data: project });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
}