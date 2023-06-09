import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error loading users." });
    }
  } else if (req.method === "POST") {
    const { name, email, password, role, nomor_telepon, alamat, image } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10),
          role,
          nomor_telepon,
          alamat,
          image,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
