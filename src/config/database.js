const { PrismaClient }  = require( '@prisma/client')

const DB = new PrismaClient({
    log: ['query'],
  })


DB.$use(async (params, next) => {
  if (params.action === 'findMany') {
    // Add a filter to exclude soft-deleted records
    params.args.where = {
      ...params.args.where
    };
    console.log(JSON.stringify(params.args.where))
  }
  return next(params); // Proceed with the modified operation
});
module.exports = DB