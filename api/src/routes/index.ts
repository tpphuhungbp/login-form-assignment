import express from "express";
import signInGoogle from "../controller/auth";

const router = express.Router();

// router.route("/signin").post(signIn);
// router.route("/signup").post(signIn);
router.route("/signin-google").post(signInGoogle);

export default router;
