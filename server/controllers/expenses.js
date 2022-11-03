const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")
const Expense = require("../models/Expense")

const getAllExpenses = async (req, res) => {
  console.log("#Expenses: getAllExpenses")
  const expenses = await Expense.find({})
  res.status(StatusCodes.OK).json({ totalCount: expenses.length, expenses })
}

const getExpense = async (req, res) => {
  console.log("#Expenses: getExpense")
  const { id: expenseID } = req.params
  const expense = await Expense.findOne({ _id: expenseID })

  if (!expense) {
    throw new NotFoundError(`No Expense with id: ${expenseID}`)
  }

  res.status(StatusCodes.OK).json({ expense })
}

const createExpense = async (req, res) => {
  req.body.userID = '635d6b07f7e691e5a84be5e0';//req.user.userID;
  req.body.accountID = '1';//req.account.accountID;
  console.log("#Expenses: createExpense")
  const expense = await Expense.create(req.body)
  res.status(StatusCodes.CREATED).json({ expense })
}

const updateExpense = async (req, res) => {
  console.log("#Expenses: updateExpense")
  const { id: expenseID } = req.params
  const expense = await Expense.findOneAndUpdate({ _id: expenseID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!expense) {
    throw new NotFoundError(`No Expense with id: ${expenseID}`)
  }

  res.status(StatusCodes.OK).json({ expense })
}

const deleteExpense = async (req, res) => {
  console.log("#Expenses: deleteExpense")
  const { id: expenseID } = req.params
  const expense = await Expense.findOneAndRemove({ _id: expenseID })

  if (!expense) {
    throw new NotFoundError(`No Expense with id: ${expenseID}`)
  }

  res.status(StatusCodes.OK).send()
}

const searchExpense = async (req, res) => {}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  searchExpense,
}
