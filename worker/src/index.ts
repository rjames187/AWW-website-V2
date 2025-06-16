import { Router } from "itty-router";
import { CORS_HEADERS, ctxFactory, errorResponse, jsonResponse } from "./utils";
import { emailController } from "./email-controller";

const router = Router();

router.get('/', () => {
  return jsonResponse(
    { message: "AWWW Service is running ..." },
    200
  );
})

router.get('/email', emailController);

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
    const ctx = ctxFactory(env);

    try {
      return await router.fetch(request, ctx);
    } catch (error: any) {
      console.error("Internal Server Error:", error);
      return errorResponse(`Internal Server Error: ${error?.message}`, 500);
    }
  },
} satisfies ExportedHandler<Env>;
