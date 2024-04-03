const getRevenueController = require("./get_revenue")
const getMonthRevenueController = require("./get_month_revenue")

// food controller 
module.exports = (dependencies) => {
    return {
        getRevenueController: getRevenueController(dependencies),
        getMonthRevenueController: getMonthRevenueController(dependencies)
    }
}