import { Router, type IRouter, type Request, type Response } from "express";
import { db, bookingsTable, consultationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/bookings", async (req: Request, res: Response) => {
  const { id, service, name, email, phone, date, timeSlot, status } = req.body;

  if (!id || !service || !name || !email || !phone || !date || !timeSlot || !status) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const userId = req.isAuthenticated() ? req.user.id : null;

  const [booking] = await db
    .insert(bookingsTable)
    .values({ id, userId, service, name, email, phone, date, timeSlot: timeSlot, status })
    .returning();

  res.status(201).json(booking);
});

router.get("/bookings", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const bookings = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.userId, req.user.id));

  res.json({ bookings });
});

router.post("/consultations", async (req: Request, res: Response) => {
  const { id, name, email, need, date } = req.body;

  if (!id || !name || !email || !need || !date) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const userId = req.isAuthenticated() ? req.user.id : null;

  const [consultation] = await db
    .insert(consultationsTable)
    .values({ id, userId, name, email, need, date })
    .returning();

  res.status(201).json(consultation);
});

router.get("/consultations", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const consultations = await db
    .select()
    .from(consultationsTable)
    .where(eq(consultationsTable.userId, req.user.id));

  res.json({ consultations });
});

export default router;
