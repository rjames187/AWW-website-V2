import { Router } from "itty-router";
import { errorResponse, getCorsHeaders, jsonResponse } from "./utils";
import { emailController } from "./email-controller";
import EmailService from "./EmailService";
import ImageService from "./ImageService";
import { imageController } from "./image-controller";
import { dataController } from "./data-controller";
import DataService from "./DataService";
import { JWTService } from "./auth/JWTService";
import { authenticate } from "./auth/middleware";
import { LoginService } from "./auth/LoginService";
import { loginController } from "./auth/login-controller";
import { refreshController } from "./auth/refresh-controller";
import { CookieHelper } from "./auth/CookieHelper";

const router = Router();

router.get('/', () => {
  return jsonResponse(
    { message: "AWWW Service is running ..." },
    200
  );
})

router.post('/contact', emailController);

router.post('/auth/login', loginController);
router.post('/auth/refresh', refreshController);

router.put('/upload-image', authenticate, imageController);

router.options('*', () => {
  return new Response(null, {
    headers: getCorsHeaders(),
    status: 204
  });
});

// controller supports both GET and POST
router.all('/data', dataController);

router.all("*", () => {
  return errorResponse("Not Found", 404);
});

export default {
  async fetch(request, env) {
    const requestOrigin = request.headers.get("Origin") || '';
    const allowedOrigins = [...(env.CLIENT_ORIGINS?.split(",") || []), 'http://localhost:5173'];

    CookieHelper.clientOrigin = allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];

    EmailService.startService(
      env.BREVO_KEY,
      env.FROM_EMAIL,
      env.FROM_NAME,
      env.ADMIN_EMAIL,
      env.OWNER_EMAIL,
      env.DUAL_NOTIFICATIONS
    );

    ImageService.startService(env.IMG_BUCKET);

    DataService.startService(env.KV);

    JWTService.startService(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET);

    LoginService.startService(env.ADMIN_USERNAME, env.ADMIN_PASSWORD);

    try {
      return await router.fetch(request);
    } catch (error: any) {
      console.error("Internal Server Error:", error);

      if (error instanceof Error) {
        EmailService.instance?.sendErrorAlertEmail(
          500,
          new Date(),
          error,
          request
        ).catch(err => console.error("Failed to send error alert email:", err));
      }

      return errorResponse(`Internal Server Error: ${error?.message}`, 500);
    }
  },
} satisfies ExportedHandler<Env>;
