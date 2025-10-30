import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, default: 'uncategorized' }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);