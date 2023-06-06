import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const index = async (_, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      profile: true,
      posts: true,
    },
  });
  return res.json({ allUsers });
};

export const indexById = async (req, res) => {
  const allUsers = await prisma.user.findUnique({
    include: {
      profile: true,
      posts: true,
    },
    where: {
      id: req.params.id
,
    },
  });
  return res.json({ allUsers });
};

export const create = async (req, res) => {

  const {name, email, password} = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: { bio: req.body.profile.create.bio },
      },
    },
  });

  const created = await prisma.user.findMany({
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
  const users = req.params.id
;
  let user = await prisma.user.findUnique({
    where: {
      id: req.params.id
    },
  });

  if (!user) return res.status(400).json({ message: "User not found" });

  const updated = await prisma.user.update({
    where: { id: users },
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  return res.json({ updated });
};

export const deletes = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {id: req.params.id}
  })
  const authToken = req.headers.authorization
  
  const [Bearer, token] = authToken.split(' ')
  const {id}  = verify(token, process.env.JWT_SECRET)
  
  const getUser = await prisma.admin.findUnique({
    where: {id}
  });

  if(!user) return res.status(404).json({ message: "User Not Found!" });

  if(id == req.params.id){
  await prisma.user.delete({
    where: { id: req.params.id },
  })};

  
  if (getUser.role == 'admin'){
    await prisma.user.delete({
      where: { id: req.params.id },
  })}
  else if(id != req.params.id){
    return res.status(418).json({ message: "Permission denied!" });
  }

  return res.json({ message: "Delete succeful!" });
  
};
