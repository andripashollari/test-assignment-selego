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
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ ok: true, data: projects });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ ok: false, error: 'Project not found' });
        }
        res.status(200).json({ ok: true, data: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};