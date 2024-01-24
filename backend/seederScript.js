require('dotenv').config()

const ProblemData = require('./data/problems')
const {connectDB} = require('./config/db')
const Problem = require('./models/problemModel')

connectDB()

const importData = async () => {
  try {
    await Problem.deleteMany({})

    await Problem.insertMany(ProblemData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()