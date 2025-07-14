import { Router } from "itty-router";
import { CORS_HEADERS, errorResponse, jsonResponse } from "./utils";
import { emailController } from "./email-controller";
import EmailService from "./EmailService";
import ImageService from "./ImageService";
import { imageController } from "./image-controller";
import { dataController } from "./data-controller";
import DataService from "./DataService";
import { JWTService } from "./auth/JWTService";

const router = Router();

router.get('/', () => {
  return jsonResponse(
    { message: "AWWW Service is running ..." },
    200
  );
})

router.post('/contact', emailController);

router.put('/upload-image', imageController);

router.options("*", () => {
  return new Response(null, {
    headers: CORS_HEADERS,
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

    try {
      return await router.fetch(request);
    } catch (error: any) {
      console.error("Internal Server Error:", error);
      return errorResponse(`Internal Server Error: ${error?.message}`, 500);
    }
  },
} satisfies ExportedHandler<Env>;
