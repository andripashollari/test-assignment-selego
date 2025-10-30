import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async() => {
  const { data, error } = await resend.emails.send({
    from: `Dev <onboarding@resend.dev>`,
    to: ["pashollariandri@gmail.com"],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {

    return console.error({ error });
  }
  console.log({ data });
};