import { Context } from "./types";
import { errorResponse, jsonResponse } from "./utils";

export async function emailController(request: Request, ctx: Context): Promise<Response> {
  const response = await ctx.emailService.sendEmail("rory.james2021@gmail.com", "Rory James");
  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return jsonResponse(data, 200);
}