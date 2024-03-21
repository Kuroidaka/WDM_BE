const food = require("./food/index.js");
const lob = ("./lob/index.js");
const user = require("./user/index.js");
const service = require("./service/index.js");

const useCases = {
    food,
    lob,
    user,
    service
}

module.exports = useCases