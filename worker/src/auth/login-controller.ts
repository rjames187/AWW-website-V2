import { errorResponse, getCorsHeaders } from "../utils";
import { CookieHelper } from "./CookieHelper";
import { LoginService } from "./LoginService";

interface LoginRequest {
  username: string;
  password: string;
}

export async function loginController(request: Request): Promise<Response> {
  const { username, password }: LoginRequest = await request.json();

  if (!username || !password) {
    return errorResponse("Username and password are required", 400);
  }

  const tokenPair = LoginService.instance.login(username, password);
  if (!tokenPair) {
    return errorResponse("Invalid username or password", 401);
  }

  const refreshCookie = CookieHelper.createSetCookieHeader('refreshToken', tokenPair.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // seconds, not milliseconds!
    path: '/auth/refresh'
  });


  return new Response(JSON.stringify({ accessToken: tokenPair.accessToken }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': refreshCookie,
      ...getCorsHeaders()
    },
  });
}