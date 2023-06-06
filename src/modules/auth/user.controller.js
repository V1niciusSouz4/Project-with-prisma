import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const loginUSER = async (req, res) => {

    // let user = await prisma.user.findUnique({
    //     where: {email: req.body.email},
    //     select: {
    //         email: true
    //     }
    // });
    // console.log(user)

  let user = await prisma.$queryRaw`SELECT * FROM "User" WHERE "email" = ${req.body.email}`;

  if (user.length == 0) return res.status(404).json({ message: "User does not exists" });
  
  let isMatch = await bcrypt.compare(req.body.password, user[0].password)

  if (!isMatch)
    return res.status(401).json({
      message: 'Invalid username/password'
    })

  let token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    });

  return res.json({
    data: {
      token,
    },
  });
};

export const profile = async (req, res) => {
  let user = await userModel.findOne({ _id: req.user_id });

  const { __v, secret, ...exposedUser } = user.toObject();

  return res.json({ data: { user: exposedUser } });
};
