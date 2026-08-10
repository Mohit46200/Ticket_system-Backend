import express from "express";

import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  addComment
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);

router.get("/", getTickets);

router.get("/:id", getTicketById);

router.put("/:id", updateTicket);

router.delete("/:id", deleteTicket);

router.post("/:id/comments", addComment);

export default router;