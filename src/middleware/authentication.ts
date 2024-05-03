import jwt from 'jsonwebtoken';
import express from 'express';

const JWT_KEY = process.env.WEBTOKEN_SECRET || "SECRET";

export const authentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({ status: false, message: "you are not logged in." });
  }
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: "your account not found" });
    }
    (req as any).userId = (decoded as any).userId;
    next();
  });
};

