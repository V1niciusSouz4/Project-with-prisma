import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

export const index = async (_, res) => {
  const allAdmins = await prisma.admin.findMany({
    include: {
      profile: true,
      posts: true,
    },
  });
  return res.json({ allAdmins });
};

export const indexById = async (req, res) => {
  const allAdmins = await prisma.admin.findUnique({
    include: {
      profile: true,
      posts: true,
    },
    where: {
      id: req.params.id
,
    },
  });
  return res.json({ allAdmins });
};

export const create = async (req, res) => {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  await prisma.admin.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      profile: {
        create: { bio: req.body.profile.create.bio },
      },
    },
  });

  const created = await prisma.admin.findMany({
    where: {
      email: req.body.email,
    },
    include: {
      posts: true,
      profile: true,
    },
  });
  return res.json({ created });
};

export const update = async (req, res) => {
  const Admins = req.params.id
;
  let admin = await prisma.admin.findUnique({
    where: {
      id: req.params.id
,
    },
  });

  if (!admin) return res.status(400).json({ message: "admin not found" });

  const updated = await prisma.admin.update({
    where: { id: Admins },
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  return res.json({ updated });
};

export const deletes = async (req, res) => {
  await prisma.admin.delete({
    where: { id: req.params.id
 },
  });
  return res.json({ message: "Delete succeful!" });
};
