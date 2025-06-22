import EmailService from "./EmailService";
import { EmailRequest } from "./types";
import { errorResponse, jsonResponse } from "./utils";

export async function emailController(request: Request): Promise<Response> {
  const body: EmailRequest = await request.json();
  if (!body.email || !body.name || !body.message) {
    return errorResponse("Missing required fields: email, name, message", 400);
  }

  const response = await EmailService.instance.sendContactEmail(
    body.email,
    body.name,
    body.message
  );
  
  return jsonResponse(response, 201);
}