import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async (_, res) => {
  const allclients = await prisma.clients.findMany({
    include: {
      profile: true,
    },
  });
  return res.json({ allclients });
};

export const indexById = async (req, res) => {
  const allclients = await prisma.clients.findUnique({
    include: {
      profile: true,
      posts: true,
    },
    where: {
      id: req.params.id,
    },
  });
  return res.json({ allclients });
};

export const create = async (req, res) => {
  await prisma.clients.create({
    data: {
      email: req.body.email,
    },
  });

  const created = await prisma.clients.findMany({
    where: {
      email: req.body.email,
    },
  });
  return res.json({ created });
};

export const deletes = async (req, res) => {
  await prisma.clients.delete({
    where: { id: req.params.id },
  });
  return res.json({ message: "Delete succeful!" });
};
