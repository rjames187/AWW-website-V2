import Emailer from "./Emailer";

export default {
  async fetch(request, env) {
    const brevoKey = env.BREVO_KEY;
    const fromEmail = env.FROM_EMAIL;
    const fromName = env.FROM_NAME;

    const emailer = new Emailer(brevoKey, fromEmail, fromName);
    let result = "";
    try {
      result = await emailer.sendEmail("rory.james2021@gmail.com", "Rory James");
    } catch (error: any) {
      console.error("Error sending email:", error);
      return new Response(`Error sending email: ${error?.message}`);
    }

    return new Response(result, {
      headers: {
        "content-type": "text/plain", 
      },
    });
  },
} satisfies ExportedHandler<Env>;
