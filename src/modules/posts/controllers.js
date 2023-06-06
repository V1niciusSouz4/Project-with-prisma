import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export const index = async (_, res) => {
  const allPosts = await prisma.post.findMany({
    select:{
      id: true,
      title: true,
      authorId: true
    }
  });
  return res.json({ allPosts });
};

export const indexById = async (req, res) => {
  const uniquePost = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      title: true
    }
  });
  return res.json({ uniquePost });
};

export const create = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
  });
  if (!user) return res.status(404).json({ message: "User Not Found!" });

  const authToken = req.headers.authorization;
  if (authToken == "Bearer {{TOKEN}}") {
    return res.status(418).json({ message: "Acess denied" });
  }

  const [Bearer, token] = authToken.split(" ");

  const { id } = verify(token, process.env.JWT_SECRET);

  const getUser = await prisma.user.findUnique({
    where: { id },
  });


  if (id == req.params.id) {
    await prisma.post.create({
      data: {
        title: req.body.title,
        author: { connect: { id: req.params.id } },
      },
    });
  }

  if (getUser.role == "admin") {
    await prisma.post.create({
      data: {
        title: req.body.title,
        author: { connect: { id: req.params.id } },
      },
    });
  }
  if (id != req.params.id) {
    return res.status(418).json({ message: "Permission denied!" });
  }

  return res.json({ message: "Post succefull!" });
};

export const update = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
  });
 
  const authToken = req.headers.authorization;
  if (authToken == "Bearer {{TOKEN}}") {
    return res.status(418).json({ message: "Acess denied" });
  }

  const [Bearer, token] = authToken.split(" ");

  const { id } = verify(token, process.env.JWT_SECRET);
  
  const AdminAcess = await prisma.admin.findUnique({
    where: { id },
  });

  const authorPost = post.authorId;
  
  if (!authorPost)
    return res.status(404).json({ message: "Author Post Not Found!" });

  if (id == authorPost) {
    await prisma.post.update({
      where: { id: req.params.id },
      data:{
        title: req.body.title
      }
    });
  }else if (AdminAcess) {
    await prisma.post.update({
      where: { id: req.params.id },
      data:{
        title: req.body.title
      }
    });
  }
  else {
    return res.status(418).json({ message: "Permission denied!" });
  }

  return res.json({ message: "Update succefull!" });
};

export const deletes = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
  });

  const authToken = req.headers.authorization;
  if (authToken == "Bearer {{TOKEN}}") {
    return res.status(418).json({ message: "Acess denied" });
  }

  const [Bearer, token] = authToken.split(" ");

  const { id } = verify(token, process.env.JWT_SECRET);
  
  const authorPost = post.authorId;

  if (!authorPost)
    return res.status(404).json({ message: "Author Post Not Found!" });

  if (id == authorPost) {
    await prisma.post.delete({
      where: { id: req.params.id },
    });
  }

  if (authorPost.role == "admin") {
    await prisma.post.delete({
      where: { id: req.params.id },
    });
  }
  if (id != authorPost) {
    return res.status(418).json({ message: "Permission denied!" });
  }

  return res.json({ message: "Delete succefull!" });
};
