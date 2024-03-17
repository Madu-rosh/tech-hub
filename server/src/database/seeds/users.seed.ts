// Seed script for Users
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/users.model";

export const usersSeed = async () => {
  const usersData = [
    {
      name: "Alice Johnson",
      username: "alicejohnson",
      email: "alice@example.com",
      password: "password123",
      role: "user",
      age: 25,
    },
    {
      name: "Bob Smith",
      username: "bobsmith",
      email: "bob@example.com",
      password: "password456",
      role: "admin",
      age: 30,
    },
    {
      name: "Charlie Brown",
      username: "charliebrown",
      email: "charlie@example.com",
      password: "password789",
      role: "author",
      age: 22,
    },
    {
      name: "Dana Scully",
      username: "danascully",
      email: "dana@example.com",
      password: "password101112",
      role: "author",
      age: 32,
    },
    {
      name: "Evan Wright",
      username: "evanwright",
      email: "evan@example.com",
      password: "password131415",
      role: "user",
      age: 28,
    },
  ];

  for (const user of usersData) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await User.deleteMany(); // Caution: This will clear the entire users collection
  await User.insertMany(usersData);

  console.log("Users seeded successfully.");
};

usersSeed()
  .then(() => {
    console.log("Done seeding users.");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Seeding users failed:", error);
    mongoose.connection.close();
  });
