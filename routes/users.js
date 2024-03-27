import express from "express";
import dotenv from "dotenv";
import {
  deleteById,
  getAllUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
dotenv.config();

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteById);
router.route("/").get(getAllUser);

export default router;
