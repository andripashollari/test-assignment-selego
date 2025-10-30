Budget Tracker App
Overview
This is a full-stack Budget Tracker app built with React (frontend), Node.js/Express (backend), and MongoDB. It allows users to:

- Create and manage projects with budgets
- Add, view, and delete expenses for each project
- Track if projects are over budget
- Update or delete projects
- View project expenses on a dedicated page
Key Features & Decisions
1. Backend (Express + MongoDB)
- Projects & Expenses models are separated for simplicity and scalability.
- Used RESTful API:
  - GET for fetching projects/expenses
  - POST for creating projects/expenses
  - PUT for updating projects
  - DELETE for removing projects/expenses
- Added error handling and validation (unique project names, required fields).

2. Frontend (React + Bootstrap + react-hot-toast)
- React Router handles / (projects) and /project/:id (expenses) pages.
- ProjectForm & ExpenseForm components simplify adding data.
- ProjectList & ExpenseList display tables with actions.
- Used Bootstrap for styling instead of Tailwind for simplicity.
- react-hot-toast for instant notifications (success/error messages).
- Modal used for updating projects inline.

3. State Management
- Local state in components.
- No global state manager needed for this scale.

4. API Integration
- api.js centralizes all backend calls.
- Functions follow REST principles, handle errors, and return usable data.

Design Choices
- Separated components and pages for maintainability.
- Separate collections for projects and expenses — avoids nested data and makes queries simpler.
- Callbacks for refreshing data allow updates after add/delete without page reload.
- Bootstrap tables & modals provide quick, clean UI without extra dependencies.

What Could Be Improved
1. Authentication — add user accounts to track projects per user.
2. Better UI/UX — use a richer design framework, charts for budget visualization.
3. AI Integration — auto-categorize expenses or predict over-budget risk.
4. Email Notifications — send real alerts when a project goes over budget.
5. Performance — pagination for large expense lists.
6. Unit tests & error handling — more robust tests for backend and frontend.

How to Run
1. Backend:
   cd backend
   npm install
   npm run dev
  - Add Resend API Key and OpenAi Key as well
  - Add MongoDB Key for database

2. Frontend:
   cd frontend
   npm install
   npm start

3. Open http://localhost:5173 in your browser.
