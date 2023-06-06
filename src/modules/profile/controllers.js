import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async (req, res) => {
  const bio = await prisma.profile.findMany({
    where: {
      id: req.params.id
    },
  });
  return res.json({ bio });
};

export const update = async (req, res) => {

  const updated = await prisma.profile.update({
    where: { id: req.params.id },
    data: { bio: req.body.bio },
  });
  return res.json({ updated });
};

