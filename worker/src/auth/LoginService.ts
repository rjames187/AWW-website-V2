import { JWTService, TokenPair } from "./JWTService";

export class LoginService {
  public static instance: LoginService;
  private adminUsername: string;
  private adminPassword: string;

  private constructor(username: string, password: string) {
    this.adminUsername = username;
    this.adminPassword = password;
  }

  public static startService(username: string, password: string): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService(username, password);
    }
    return LoginService.instance;
  }

  public login(username: string, password: string): TokenPair | null {
    if (username !== this.adminUsername || password !== this.adminPassword) {
      return null;
    }

    return JWTService.instance.generateTokenPair();
  }
}