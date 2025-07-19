import jwt from 'jsonwebtoken';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenPayload {
  issued: number;
  type: 'refresh';
}

interface AccessTokenPayload {
  issued: number;
  type: 'access';
}

export class JWTService {
  public static instance: JWTService;
  private readonly accessSecret: jwt.Secret;
  private readonly refreshSecret: jwt.Secret;
  private readonly accessExpiresIn: number = 1000 * 60 * 15; // 15 minutes
  private readonly refreshExpiresIn: number = 1000 * 60 * 60 * 24 * 7; // 7 days

  public static startService(accessSecret: string, refreshSecret: string) {
    if (JWTService.instance === undefined) {
      JWTService.instance = new JWTService(accessSecret, refreshSecret);
    }
  }

  constructor(accessSecret: string, refreshSecret: string) {
    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT secrets must be defined in environment variables');
    }

    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
  }

  /**
   * Generate both access and refresh tokens for a user
   */
  generateTokenPair(): TokenPair {
    const accessToken = this.generateAccessToken();
    const refreshToken = this.generateRefreshToken();
    
    return { accessToken, refreshToken };
  }

  /**
   * Generate access token with user permissions
   */
  private generateAccessToken(): string {
    const payload = {
      issued: Date.now(),
      type: 'access',
    }

    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
      issuer: 'cms-backend',
      audience: 'cms-client',
    });
  }

  /**
   * Generate refresh token
   */
  private generateRefreshToken(): string {
    const payload = {
      issued: Date.now(),
      type: 'refresh',
    }

    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
      issuer: 'cms-backend',
      audience: 'cms-client'
    });
  }

  /**
   * Verify and decode access token
   */
  verifyAccessToken(token: string) {
    try {
      jwt.verify(token, this.accessSecret, {
        issuer: 'cms-backend',
        audience: 'cms-client'
      });

      return;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Access token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid access token');
      }
      throw new Error('Access token verification failed');
    }
  }

  /**
   * Verify and decode refresh token
   */
  verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.refreshSecret, {
        issuer: 'cms-backend',
        audience: 'cms-client'
      }) as RefreshTokenPayload;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      return;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw new Error('Refresh token verification failed');
    }
  }

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) return null;
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }
    
    return parts[1];
  }
}