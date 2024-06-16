const express = require("express");
const { authMiddleWare } = require("../middleware");
const { User, Account } = require("../db");
const mongoose = require("mongoose")
const router = express.Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  const account = Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

router.put("/transfer", authMiddleWare, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  const { amount, to } = req.body;
  const acct = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!acct || acct.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAcct = Account.findOne({
    username: to,
  });
  if (!toAcct) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
