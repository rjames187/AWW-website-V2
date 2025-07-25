import { CORS_HEADERS, errorResponse } from "../utils";
import { CookieHelper } from "./CookieHelper";
import { JWTService } from "./JWTService";

export async function refreshController(request: Request): Promise<Response> {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = CookieHelper.parseCookies(cookieHeader);
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return errorResponse("Refresh token required", 401);
  }

  try {
    JWTService.instance.verifyRefreshToken(refreshToken);
  } catch (error) {
    return errorResponse((error as Error).message, 401);
  }

  const tokens = JWTService.instance.generateTokenPair();

  const newRefreshCookie = CookieHelper.createSetCookieHeader('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/auth/refresh'
  });

  return new Response(
    JSON.stringify({
      accessToken: tokens.accessToken
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': newRefreshCookie,
        ...CORS_HEADERS
      }
    }
  );
}