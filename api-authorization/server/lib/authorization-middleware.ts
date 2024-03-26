/* eslint-disable @typescript-eslint/no-unused-vars -- Remove me */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from './client-error.js';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  /* your code here */
  const authHeader = req.get('Authorization');
  // req.get(field) Returns the specified HTTP request header field (case-insensitive match)
  // accesses the value of the 'Authorization' header sent by the client.
  const token = authHeader?.split('Bearer ')[1];
  // The term "Bearer" itself is part of the Authorization header format commonly used to transmit access tokens.
  // The value of this header typically starts with the word "Bearer" followed by a space and then the actual access token.
  // After splitting the authHeader string using 'Bearer ' as the separator, the result will be an array.
  // Since the 'Bearer ' prefix is expected to be present in the authorization header, this array will contain at least two elements: the part of the string before 'Bearer ' and the part after it.
  // [0]: The first element ([0]) of the array contains the part of the string before the 'Bearer ' prefix.
  // [1]: The second element ([1]) of the array contains the part of the string after the 'Bearer ' prefix, which is expected to be the JWT token itself.

  if (!authHeader || !token) {
    throw new ClientError(401, 'authentication required');
  }

  const hashKey = process.env.TOKEN_SECRET;

  if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

  const payload = jwt.verify(token, hashKey);
  req.user = payload as Request['user'];
  // "as" keyword is a TypeScript feature known as type assertion or type casting.
  // It's used to tell the TypeScript compiler to treat the type of an expression as a specific type, even if TypeScript's type inference would not normally infer that type.
  // Request is a type defined by the Express framework. It represents the type of an HTTP request object (req)
  //  after decoding a JWT token (payload), you're assigning it to req.user, which is typically used to store the authenticated user's information.
  // By asserting payload as Request['user'], you're telling TypeScript that you're confident that the payload token matches the type structure of Request['user'],
  //  allowing TypeScript to perform type checking and providing IntelliSense support accordingly.
  next();
}

/*
 * Get the 'Authorization' header from the request.
 * Parse the token from the header; e.g., auth.split('Bearer ')[1]
 * Note: the space after `Bearer` is important.
 * If no header or no token is provided,
 *   throw a 401 error with the message 'authentication required'
 * Use jwt.verify() to verify the authenticity of the token and extract its payload.
 * Note: You need the TOKEN_SECRET. You can look at the `hashKey` code in server.ts if needed.
 * Assign the extracted payload to the user property of the req object.
 * Note: The TypeScript for this assignment is best written with a type assertion:
 *   req.user = payload as Request['user'];
 * Call next() (with no arguments) to let Express know to advance to its next route or middleware.
 *
 * References:
 * https://expressjs.com/en/4x/api.html#req.get
 * https://nodejs.org/api/http.html#http_message_headers
 * https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 */
