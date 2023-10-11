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
exports.viewBagRecord = exports.createBagRecord = void 0;
const bagModel_1 = __importDefault(require("../model/bagModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const createBagRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bag, email } = req.body;
        const findStudent = yield studentModel_1.default.findOne({ email });
        if (findStudent) {
            const bagInfo = yield bagModel_1.default.create({
                bag,
                cash: bag * 200,
            });
            yield studentModel_1.default.findByIdAndUpdate(findStudent._id, {
                balance: (findStudent === null || findStudent === void 0 ? void 0 : findStudent.balance) + (bagInfo === null || bagInfo === void 0 ? void 0 : bagInfo.cash),
            }, { new: true });
            findStudent === null || findStudent === void 0 ? void 0 : findStudent.bagHistory.push(new mongoose_1.default.Types.ObjectId(bagInfo === null || bagInfo === void 0 ? void 0 : bagInfo._id));
            findStudent.save();
            return res.status(201).json({
                message: "created",
                data: bagInfo,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating bag record",
            data: error.message,
        });
    }
});
exports.createBagRecord = createBagRecord;
const viewBagRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const populateBagHistory = yield studentModel_1.default.findById(studentID).populate({
            path: "bagHistory",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "view bag record",
            data: populateBagHistory,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error viewing",
            data: error.message,
        });
    }
});
exports.viewBagRecord = viewBagRecord;
