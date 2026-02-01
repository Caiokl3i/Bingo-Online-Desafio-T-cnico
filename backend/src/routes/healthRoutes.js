import express from "express";
import { check } from "../controllers/healthController.js";

export const router = express.Router();

router.get("/", check)