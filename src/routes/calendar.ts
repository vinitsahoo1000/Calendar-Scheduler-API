import { RequestHandler, Router } from "express";
import {
    createCalendar,
    getCalendars,
    deleteCalendar,
} from "../controllers/calanderController";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();


/**
 * @swagger
 * tags:
 *   name: Calendars
 *   description: Calendar management
 */

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create a new calendar
 *     tags: [Calendars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Work Calendar
 *     responses:
 *       201:
 *         description: Calendar created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createCalendar as unknown as RequestHandler);

/**
 * @swagger
 * /calendar:
 *   get:
 *     summary: Get all calendars for the authenticated user
 *     tags: [Calendars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of calendars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getCalendars as unknown as RequestHandler);

/**
 * @swagger
 * /calendar/{id}:
 *   delete:
 *     summary: Delete a calendar by ID
 *     tags: [Calendars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The calendar ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Calendar deleted
 *       404:
 *         description: Calendar not found
 */
router.delete("/:id", authenticate, deleteCalendar as unknown as RequestHandler);

export default router;
