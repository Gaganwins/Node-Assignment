import { IncomingHttpHeaders } from 'http'; // Import IncomingHttpHeaders type
import IUser from '../services/user/IUserService';
import { JWT_SECRET } from '../env';
import jwt from 'jsonwebtoken';
import { Response, response } from 'express';

export const extractBearerToken = (
  headers: IncomingHttpHeaders,
): string | undefined => {
  let token;
  const rawAuthorization = headers.authorization;
  if (
    rawAuthorization &&
    typeof rawAuthorization === 'string' &&
    rawAuthorization.startsWith('Bearer ')
  ) {
    token = rawAuthorization.split('Bearer ')[1];
  }
  return token;
};

// Define type for req.headers
interface CustomRequest {
  headers?: IncomingHttpHeaders; // Use IncomingHttpHeaders type for headers
  user?: IUser;
  authorization?: string;
}

/**
 * @description function for authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
export default async function authenticate(
  req: CustomRequest, // Use CustomRequest type
  res: Response,
  next: () => void,
) {
  try {
    const token = extractBearerToken(req?.headers);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', code: 401 });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded?.id,
      role: decoded?.role,
      first_name: decoded?.first_name,
      last_name: decoded?.last_name,
      email: decoded?.last_name,
      phone_number: decoded?.last_name,
      status: decoded?.last_name,
    };
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message, error: 'Unauthorized', code: 401 });
  }
}
