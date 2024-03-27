import express from "express";
import dotenv from "dotenv";
import {
  deleteById,
  getAllUser,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyRefreshToken } from "../middleware/checkRefreshtoken.js";
dotenv.config();

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteById);
router.route("/").get(getAllUser);
router.route("/refreshAccessToken").post(verifyRefreshToken,refreshAccessToken);
export default router;
