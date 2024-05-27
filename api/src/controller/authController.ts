import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import BadRequestError from "../errors/badRequest";
import httpStatus from "http-status";
import brycpt from "bcrypt";
import dotenv from "dotenv";
import UserRepository from "../repositories/userRepository";
import UnauthorizedError from "../errors/unauthorized";
import InvalidParameterError from "../errors/invalidParam";

//For env File
dotenv.config();

async function signInGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { idToken } = req.body;
    if (idToken) {
      const clientID = process.env.GOOGLE_CLIENT_ID;

      const client = new OAuth2Client(clientID);

      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: clientID,
      });

      const googlePayload = ticket.getPayload();

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

        const newToken = await generateToken(newUser._id);

        newUser.googleAuth = "hidden";

        res.status(httpStatus.OK).json({ user: newUser, token: newToken });
      }
      if (user) {
        const newToken = await generateToken(user._id);

        user.googleAuth = "hidden";

        res.status(httpStatus.OK).json({ user: user, token: newToken });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new InvalidParameterError("Email or password"));
      return;
    }

    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
      next(new UnauthorizedError("User not found"));
      return;
    }

    const correctPassword = await brycpt.compare(String(password), user.password);

    if (!correctPassword) {
      next(new UnauthorizedError("Wrong password"));
      return;
    }

    const newToken = await generateToken(user._id);

    user.password = "hidden";

    res.status(httpStatus.OK).json({ user, token: newToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password) {
      next(new InvalidParameterError("Email or password"));
      return;
    }

    const user = await UserRepository.getUserByEmail(email);

    if (user) {
      next(new BadRequestError("User already exists"));
      return;
    }

    const hashedPassword = await brycpt.hash(password, 10);

    const newUser = await UserRepository.createUser(email, username, hashedPassword);

    const newToken = await generateToken(newUser._id);

    newUser.password = "hidden";

    res.status(httpStatus.OK).json({ user: newUser, token: newToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function test(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(httpStatus.OK).json({ message: "success" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function generateToken(id: string) {
  try {
    const newToken = jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    UserRepository.updateUserToken(id, newToken);

    return newToken;
  } catch (err) {
    console.log(err);
  }
}

export default { signInGoogle, signIn, signUp, test };
