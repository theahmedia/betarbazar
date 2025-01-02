import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

if (!process.env.RESEND_API) {
    console.log("Provide RESEND_API inside the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Betarbazar <onboarding@resend.dev>",
            to: sendTo,
            subject: subject,
            html: html,
        });

        // if (error) {
        //     console.error(error);
        //     return { error };
        // }

        // return { data };
        if (error) {
            console.error("Error sending email:", error);
            return { error };
        }
        
        console.log("Email sent successfully:", data);
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export default sendEmail;

