import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.route.js';
import expenseRoutes from './routes/expenses.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});