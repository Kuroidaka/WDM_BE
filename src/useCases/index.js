import food from "./food/index.js";
import lob from "./lob/index.js";
import user from "./user/index.js";

const service = require("./service/index.js");

const useCases = {
    food,
    lob,
    user,
    service
}

module.exports = useCases