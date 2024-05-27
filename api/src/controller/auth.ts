import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import BadRequestError from "../errors/badRequest";
import httpStatus from "http-status";
import dotenv from "dotenv";
import UserRepository from "../repositories/userRepository";

//For env File
dotenv.config();

async function signInGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("trigger login");
    const { idToken } = req.body;
    if (idToken) {
      const clientID = process.env.GOOGLE_CLIENT_ID;

      const client = new OAuth2Client(clientID);

      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: clientID,
      });

      const googlePayload = ticket.getPayload();
      console.log(`login-oauth ---- ${JSON.stringify(googlePayload)}`);

      if (!googlePayload?.email || googlePayload.email_verified !== true) {
        next(new BadRequestError("Email permissions not granted or email is unverified"));
        return;
      }

      const user = await UserRepository.getUserByEmail(googlePayload.email);
      if (!user) {
        const newUser = await UserRepository.createUserWithGoogle(
          googlePayload.email,
          googlePayload.name || "default user",
          googlePayload.sub
        );
        const newToken = await generateToken(newUser.id);
        newUser.googleAuth = "hidden";
        res.status(httpStatus.OK).json({ user: newUser, token: newToken });
      }
      if (user) {
        user.googleAuth = "hidden";
        console.log("signed in user", JSON.stringify(user));

        const newToken = await generateToken(user.id);

        res.status(httpStatus.OK).json({ user: user, token: newToken });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function generateToken(id: number) {
  try {
    const newToken = jwt.sign({ id }, "hunghung", {
      expiresIn: "1d",
    });

    UserRepository.updateUserToken(id, newToken);
    return newToken;
  } catch (err) {
    console.log(err);
  }
}

export default signInGoogle;
