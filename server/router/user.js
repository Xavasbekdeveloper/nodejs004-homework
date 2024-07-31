import express from "express";
import { User } from "../schema/userSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user.length) {
      return res.status(400).json({
        msg: "Users is not defined",
        variant: "error",
        payload: null,
      });
    }

    res.status(200).json({
      msg: "All Users",
      variant: "success",
      payload: user,
      total: user.length,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const existUser = await User.exists({ username: req.body.username });

    if (existUser) {
      return res.status(400).json({
        msg: "User already exists",
        variant: "warning",
        payload: null,
      });
    }
    const user = await User.create(req.body);

    res.status(201).json({
      msg: "User created",
      variant: "success",
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(400).json({
        msg: "User is not defined",
        variant: "warning",
        payload: null,
      });
    }

    const user = await User.findByIdAndDelete(id, {
      new: true,
    });

    res.status(200).json({
      msg: "User deleted",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      msg: "User updated",
      variant: "success",
      payload: user,
    });
  } catch {
    res.status(500).json({
      msg: "Server error",
      variant: "error",
      payload: null,
    });
  }
});

export default router;
