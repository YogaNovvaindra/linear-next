import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const siswas = await prisma.siswa.findMany();
      res.status(200).json(siswas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error loading siswas." });
    }
  } else if (req.method === "POST") {
    const { nama, email, password, nomor_telepon, alamat, sekolah, hp_ortu, image, token } = req.body;

    try {
      const siswa = await prisma.siswa.create({
        data: {
          nama,
          email,
          password: await bcrypt.hash(password, 10),
          nomor_telepon,
          alamat,
          sekolah,
          hp_ortu,
          image,
          token,
        },
      });
      res.status(201).json(siswa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating siswa." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
