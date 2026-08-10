import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      createdBy,
      priority,
      dueDate
    } = req.body;

    if (!title || !description || !assignedTo || !createdBy) {
      return res.status(400).json({
        message: "Required fields are missing"
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      assignedTo,
      createdBy,
      priority,
      dueDate
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { status, assignedTo, search } = req.query;

    const filter = {};

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (assignedTo && assignedTo !== "ALL") {
      filter.assignedTo = assignedTo;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const tickets = await Ticket.find(filter)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .sort({
        createdAt: -1
      });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("comments.user", "name email role");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json({
      message: "Ticket deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({
        message: "User and message are required"
      });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    ticket.comments.push({
      user: userId,
      message
    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("comments.user", "name email role");

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};