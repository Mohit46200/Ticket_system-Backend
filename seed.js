import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany({});

await User.insertMany([
  {
    name: "Team Leader",
    email: "leader@company.com",
    role: "TEAM_LEADER"
  },

  {
    name: "Rahul Sharma",
    email: "rahul@company.com",
    role: "DEVELOPER"
  },

  {
    name: "Aman Kumar",
    email: "aman@company.com",
    role: "DEVELOPER"
  },

  {
    name: "Mohit Singh",
    email: "mohit@company.com",
    role: "DEVELOPER"
  },

  {
    name: "Ravi Verma",
    email: "ravi@company.com",
    role: "DEVELOPER"
  }
]);

console.log("Users created");

process.exit();