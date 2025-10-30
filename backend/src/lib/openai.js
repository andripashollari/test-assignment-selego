import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const categorizeExpense = async (title) => {
  try {
    const prompt = `
    You are a financial assistant. 
    Categorize the following expense into one of these categories:
    ["Travel", "Food", "Office Supplies", "Software", "Hardware", "Marketing", "Utilities", "Miscellaneous"].
    
    Expense title: "${title}"
    Respond with only the category name.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    const category = response.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error('AI categorization error:', error.message);
    return 'Uncategorized';
  }
};
