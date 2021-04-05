const mongoose = require("../mongoose");
const candidateModal = require("./candidate")(mongoose);

module.exports = { candidateModal };
