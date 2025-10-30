import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(projectName, budget, totalExpenses) => {
  const { data, error } = await resend.emails.send({
    from: `Dev <onboarding@resend.dev>`,
    to: ["pashollariandri@gmail.com"],
    subject: 'Budget Alert',
    html: '<h1>Budget Alert for Project: ' + projectName + '</h1>' +
          '<p>The project has exceeded its budget.</p>' +
          '<p>Budget: $' + budget + '</p>' +
          '<p>Total Expenses: $' + totalExpenses + '</p>',
  });

  if (error) {

    return console.error({ error });
  }
  console.log({ data });
};