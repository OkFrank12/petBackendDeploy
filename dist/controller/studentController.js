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
exports.signInStudent = exports.updateStudentImage = exports.updateStudentInfo = exports.getAStudent = exports.getAllStudent = exports.createStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const stream_1 = require("../utils/stream");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, studentName, schoolName } = req.body;
        const salted = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salted);
        const student = yield studentModel_1.default.create({
            email,
            password: hashed,
            studentName,
            schoolName,
            balance: 0,
        });
        return res.status(201).json({
            message: "Created student",
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error created",
            data: error.message,
        });
    }
});
exports.createStudent = createStudent;
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield studentModel_1.default.find();
        return res.status(200).json({
            message: "Get all students",
            data: all,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error getting all",
            data: error.message,
        });
    }
});
exports.getAllStudent = getAllStudent;
const getAStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const one = yield studentModel_1.default.findById(studentID);
        return res.status(200).json({
            message: "Get one student",
            data: one,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error getting one",
            data: error.message,
        });
    }
});
exports.getAStudent = getAStudent;
const updateStudentInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { houseAddress, gender, phoneNumber } = req.body;
        const student = yield studentModel_1.default.findByIdAndUpdate(studentID, {
            gender,
            houseAddress,
            phoneNumber,
        }, { new: true });
        return res.status(201).json({
            message: "updated",
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error updating info",
            data: error.message,
        });
    }
});
exports.updateStudentInfo = updateStudentInfo;
const updateStudentImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { secure_url, public_id } = yield (0, stream_1.uploadStream)(req);
        const student = yield studentModel_1.default.findByIdAndUpdate(studentID, {
            studentImage: secure_url,
            studentImageId: public_id,
        }, { new: true });
        return res.status(201).json({
            message: "Updated Image",
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error updating image",
            data: error.message,
        });
    }
});
exports.updateStudentImage = updateStudentImage;
const signInStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield studentModel_1.default.findOne({ email });
        if (student) {
            const checkPassword = yield bcrypt_1.default.compare(password, student.password);
            if (checkPassword) {
                return res.status(201).json({
                    message: "Signed in",
                    data: student,
                });
            }
            else {
                return res.status(404).json({
                    message: "Error with the password",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error with student",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error signing in",
            data: error.message,
        });
    }
});
exports.signInStudent = signInStudent;
