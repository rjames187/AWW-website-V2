import Emailer from "./Emailer";

export default {
  async fetch(request, env) {
    const brevoKey = env.BREVO_KEY;
    const fromEmail = env.FROM_EMAIL;
    const fromName = env.FROM_NAME;

    const emailer = new Emailer(brevoKey, fromEmail, fromName);
    const result = await emailer.sendEmail("rory.james2021@gmail.com", "Rory James");

    return new Response(JSON.stringify(result), {
      headers: {
        "content-type": "application/json", 
      },
    });
  },
} satisfies ExportedHandler<Env>;
