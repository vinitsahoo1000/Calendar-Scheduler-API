import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
        userId?: string;
        username?: string;
        }
    }
}


const jwt_secret = process.env.JWT_SECRET!;
if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const authenticate = (req:Request,res:Response,next:NextFunction): void => {
    const cookieToken = req.cookies?.token;

    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const token = cookieToken || bearerToken;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    jwt.verify(token,jwt_secret, (err: jwt.VerifyErrors | null , decoded: string | JwtPayload | undefined)=>{
        if(err || !decoded){
            return res.status(403).json({ error: "Invalid token" });
        }

        const payload = decoded as jwt.JwtPayload;
        req.userId = payload.id;
        req.username = payload.email;

        next();
    })
}