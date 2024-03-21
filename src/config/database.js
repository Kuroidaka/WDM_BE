const { PrismaClient }  = require( '@prisma/client')

const DB = new PrismaClient()

module.exports = DB