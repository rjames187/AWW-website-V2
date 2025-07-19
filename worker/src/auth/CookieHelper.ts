export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
}

export class CookieHelper {
  /**
   * Create a Set-Cookie header value
   */
  static createSetCookieHeader(name: string, value: string, options: CookieOptions = {}): string {
    const {
      httpOnly = true,
      secure = process.env.NODE_ENV === 'production',
      sameSite = 'strict',
      maxAge,
      expires,
      path = '/',
      domain
    } = options;

    let cookie = `${name}=${encodeURIComponent(value)}`;

    if (httpOnly) cookie += '; HttpOnly';
    if (secure) cookie += '; Secure';
    if (sameSite) cookie += `; SameSite=${sameSite}`;
    if (path) cookie += `; Path=${path}`;
    if (domain) cookie += `; Domain=${domain}`;
    
    if (maxAge !== undefined) {
      cookie += `; Max-Age=${maxAge}`;
    } else if (expires) {
      cookie += `; Expires=${expires.toUTCString()}`;
    }

    return cookie;
  }

  /**
   * Create a cookie deletion header
   */
  static createDeleteCookieHeader(name: string, path: string = '/'): string {
    return `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`;
  }

 /**
   * Parse cookies from request header
   */
  static parseCookies(cookieHeader: string | undefined): Record<string, string> {
    if (!cookieHeader) return {};

    return cookieHeader
      .split(';')
      .reduce((cookies: Record<string, string>, cookie: string) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookies[name] = decodeURIComponent(value);
        }
        return cookies;
      }, {});
  }
}
