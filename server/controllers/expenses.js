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

const searchExpenses = async (req, res) => {
  console.log('#Expenses controller - searchExpense')
  const { month, year, name, type, fields, sort, numericFilters } = req.query
  const queryObject = {}
  if(month && year){
    const startDate = `${year}-${month}-01`;
    const endtDate = `${year}-${month}-${new Date(year, month + 1, 0)}`;//take the last day of month, check if month + 1 works
    queryObject.date = {"$gte": startDate, "$lte": endtDate}
  }
  if(name){
    queryObject.name = name;
  }
  if(type){
    queryObject.type = type;
  }
  if(numericFilters){
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }
  }

  console.log(queryObject);
  let results = Expense.find(queryObject);

  if(sort){
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  }

  if(fields){
    const fieldsList = fields.split(",").join(" ");
    results = results.select(fieldsList);
  }

  if(req.query.page && req.query.limit){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    results = results.skip(skip).limit(limit);
  }

  const expenses = await results;
  res.status(StatusCodes.OK).json({ count: expenses.length, data: expenses });
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  searchExpenses,
}
