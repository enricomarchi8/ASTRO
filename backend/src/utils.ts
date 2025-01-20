import { NextFunction, Request, Response } from "express";
import { User } from "./models/userModel";
import jwt from 'jsonwebtoken'

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    )
    
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        const decode = jwt.verify(
            token,
            process.env.JW_SECRET || 'somethingsecret'
        )
        req.user = decode as {
            _id: string
            name: string
            email: string 
            isAdmin: boolean
            token: string
        }
        next()
    } else {
        res.status(401).json({ message: 'No Token' })
    }
}

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message || 'Errore del server',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  // Middleware per gestire le route non trovate
  export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route non trovata - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };