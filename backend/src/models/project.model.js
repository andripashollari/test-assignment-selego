import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    budget: { type: Number, required: true },
    totalExpenses: { type: Number, default: 0 },
    isOverBudget: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);