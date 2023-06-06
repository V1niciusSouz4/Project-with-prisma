import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const loginADM = async (req, res) => {

    // let user = await prisma.user.findUnique({
    //     where: {email: req.body.email},
    //     select: {
    //         email: true
    //     }
    // });
    // console.log(user)

  let admin = await prisma.$queryRaw`SELECT * FROM "Admin" WHERE "email" = ${req.body.email}`;

  if (admin.length == 0) return res.status(404).json({ message: "Admin does not exists" });
  
  let isMatch = await bcrypt.compare(req.body.password, admin[0].password)

  if (!isMatch)
    return res.status(401).json({
      message: 'Invalid username/password'
    })

  let token = jwt.sign({ id: admin[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    });

  return res.json({
    data: {
      token,
    },
  });
};

export const profile = async (req, res) => {
  let admin = await adminModelSS.findOne({ _id: req.user_id });

  const { __v, secret, ...exposedUser } = user.toObject();

  return res.json({ data: { user: exposedUser } });
};
