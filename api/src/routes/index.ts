import express from "express";
import authController from "../controller/authController";

const router = express.Router();

router.route("/signin").post(authController.signIn);
router.route("/signup").post(authController.signUp);
router.route("/signin-google").post(authController.signInGoogle);
router.route("/test").get(authController.test);

export default router;
