import { Router } from "itty-router";
import { CORS_HEADERS, errorResponse, jsonResponse } from "./utils";
import { emailController } from "./email-controller";
import EmailService from "./EmailService";

const router = Router();

router.get('/', () => {
  return jsonResponse(
    { message: "AWWW Service is running ..." },
    200
  );
})

router.post('/contact', emailController);

router.options("*", () => {
  return new Response(null, {
    headers: CORS_HEADERS,
    status: 204
  });
});

router.all("*", () => {
  return errorResponse("Not Found", 404);
});

export default {
  async fetch(request, env) {
    EmailService.startService(
      env.BREVO_KEY,
      env.FROM_EMAIL,
      env.FROM_NAME,
      env.ADMIN_EMAIL,
      env.OWNER_EMAIL,
      env.DUAL_NOTIFICATIONS
    );

    try {
      return await router.fetch(request);
    } catch (error: any) {
      console.error("Internal Server Error:", error);
      return errorResponse(`Internal Server Error: ${error?.message}`, 500);
    }
  },
} satisfies ExportedHandler<Env>;
