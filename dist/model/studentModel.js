"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel = new mongoose_1.default.Schema({
    studentName: {
        type: String,
    },
    houseAddress: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    schoolName: {
        type: String,
    },
    studentImage: {
        type: String,
    },
    studentImageId: {
        type: String,
    },
    gender: {
        type: String,
    },
    balance: {
        type: Number,
    },
    bagHistory: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "bags",
        },
    ],
    feeHistory: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "fees",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("students", studentModel);
