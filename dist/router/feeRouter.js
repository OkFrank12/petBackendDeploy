"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feeController_1 = require("../controller/feeController");
const fee = express_1.default.Router();
fee.route("/create-fee-record").post(feeController_1.createFeeRecord);
fee.route("/:studentID/view-student-fee").get(feeController_1.viewFeeRecord);
exports.default = fee;
