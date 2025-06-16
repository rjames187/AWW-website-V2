import EmailService from "./EmailService";
import { Context } from "./types";

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function ctxFactory(env: Env): Context {
  return {
    emailService: new EmailService(env.BREVO_KEY, env.FROM_EMAIL, env.FROM_NAME),
  };
}

export function jsonResponse(data: any, status: number) {
  if (status < 200 || status >= 600) {
    throw new Error(`Invalid status code: ${status}`);
  }

  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export function errorResponse(error: string, status: number) {
  if (status < 400 || status >= 600) {
    throw new Error(`Invalid error status code: ${status}`);
  }

  return jsonResponse({ error }, status);
}