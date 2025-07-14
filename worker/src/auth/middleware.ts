import { errorResponse } from "../utils";
import { JWTService } from "./JWTService";

export function authenticate(req: Request): Response | void {
  const token = JWTService.instance.extractTokenFromHeader(req.headers.get("Authorization") ?? undefined);

  if (!token) {
    return errorResponse("Unauthorized: No token provided", 401);
  }

  try {
    JWTService.instance.verifyAccessToken(token);
  } catch (error) {
    return errorResponse((error as Error).message, 401);
  }
}