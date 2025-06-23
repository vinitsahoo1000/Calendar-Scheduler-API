import { RequestHandler, Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example1.com
 *               password:
 *                 type: string
 *                 example: password123
 *               timezone:
 *                 type: string
 *                 example: Asia/Kolkata
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Registration failed
 */
router.post("/register", register as unknown as RequestHandler);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example1.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     timezone:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 */
router.post("/login", login as unknown as RequestHandler);

export default router;
