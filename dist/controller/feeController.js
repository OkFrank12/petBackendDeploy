"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewFeeRecord = exports.createFeeRecord = void 0;
const feeModel_1 = __importDefault(require("../model/feeModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createFeeRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cash, email } = req.body;
        const findStudent = yield studentModel_1.default.findOne({ email });
        if (findStudent) {
            const feeInfo = yield feeModel_1.default.create({
                cash,
                studentID: findStudent._id,
                schoolName: findStudent.schoolName,
            });
            if (cash < (findStudent === null || findStudent === void 0 ? void 0 : findStudent.balance)) {
                yield studentModel_1.default.findByIdAndUpdate(findStudent === null || findStudent === void 0 ? void 0 : findStudent._id, {
                    balance: (findStudent === null || findStudent === void 0 ? void 0 : findStudent.balance) - (feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo.cash),
                }, { new: true });
                findStudent === null || findStudent === void 0 ? void 0 : findStudent.feeHistory.push(new mongoose_1.default.Types.ObjectId(feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo._id));
                findStudent === null || findStudent === void 0 ? void 0 : findStudent.save();
                return res.status(201).json({
                    message: "created fee",
                    data: feeInfo,
                });
            }
            else {
                return res.status(404).json({
                    message: "Insufficient Fee",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "no student match",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating fee",
            data: error,
        });
    }
});
exports.createFeeRecord = createFeeRecord;
const viewFeeRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const populateFeeHistory = yield studentModel_1.default.findById(studentID).populate({
            path: "feeHistory",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "viewed fee",
            data: populateFeeHistory,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing fee",
            data: error.message,
        });
    }
});
exports.viewFeeRecord = viewFeeRecord;
