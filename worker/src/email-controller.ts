import EmailService from "./EmailService";
import { EmailRequest } from "./types";
import { errorResponse, jsonResponse } from "./utils";

export async function emailController(request: Request): Promise<Response> {
  const body: EmailRequest = await request.json();
  if (!body.email || !body.firstName || !body.lastName || !body.message) {
    return errorResponse("Missing required fields: email, firstName, lastName, message", 400);
  }
  const fullName = `${body.firstName} ${body.lastName}`;

  const response = await EmailService.instance.sendContactEmail(
    body.email,
    fullName,
    body.message
  );
  
  return jsonResponse(response, 201);
}