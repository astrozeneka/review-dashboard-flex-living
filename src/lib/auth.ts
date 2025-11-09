import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // Short-lived access token
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

/**
 * Payload structure for JWT tokens.
 */
export interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

/** 
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JWT token for the given payload.
 * @param payload 
 * @returns The generated JWT token.
 */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param token 
 * @returns The decoded TokenPayload if valid, null otherwise.
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Generates a secure random refresh token.
 * @returns The generated refresh token.
 */
export const generateRefreshToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Calculates the expiration date for a refresh token based on configuration.
 * @returns The expiration date for the refresh token.
 */
export const getRefreshTokenExpiration = (): Date => {
  const now = new Date();
  const expiresIn = REFRESH_TOKEN_EXPIRES_IN;
  
  if (expiresIn.endsWith('d')) {
    const days = parseInt(expiresIn.slice(0, -1));
    now.setDate(now.getDate() + days);
  } else if (expiresIn.endsWith('h')) {
    const hours = parseInt(expiresIn.slice(0, -1));
    now.setHours(now.getHours() + hours);
  } else if (expiresIn.endsWith('m')) {
    const minutes = parseInt(expiresIn.slice(0, -1));
    now.setMinutes(now.getMinutes() + minutes);
  }
  
  return now;
};

/**
 * Extracts the token from the Authorization header.
 * @param authorizationHeader 
 * @returns The extracted token or null if not found.
 */
export const extractTokenFromHeader = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) return null;
  
  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
};