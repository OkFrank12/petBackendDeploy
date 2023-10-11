"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bagController_1 = require("../controller/bagController");
const bag = express_1.default.Router();
bag.route("/create-bag-record").post(bagController_1.createBagRecord);
bag.route("/:studentID/view-student-bag").get(bagController_1.viewBagRecord);
exports.default = bag;
