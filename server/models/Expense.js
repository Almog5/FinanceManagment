const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    name: {
      type: String,
      enum: {
        values: ["Almog", "Noy", "Almog & Noy"],
        default: "Almog & Noy",
        message: "{VALUE} is not supported",
      },
    },
    type: {
      type: String,
      enum: {
        values: [
          "Food",
          "Shopping",
          "Cars",
          "Hang Out",
          "Fixed Costs",
          "Home Costs",
          "Donations",
          "Learning",
          "Gits",
          "Medical",
          "Cosmetics",
          "other",
        ],
        default: "other",
        message: "{VALUE} is not supported",
      },
    },
    description: String,
    place: String,
    cost: {
      type: Number,
      required: [true, "expense cost must be provided"],
    },
    method: {
      type: String,
      values: ["Credit", "Cibus", "Chuck", "Bit", "Cash", "Direct Debit"],
    },
    userID : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    accountID: {
      type: mongoose.Types.ObjectId,
      ref: 'Account',
      // required: [true, 'Please provide Account'],
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
