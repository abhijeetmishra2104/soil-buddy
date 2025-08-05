import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export function middleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization; 

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    if (typeof decoded === "string" || !decoded.userId) {
      return res.status(403).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId as string;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(403).json({ message: "Unauthorized" });
  }
}
