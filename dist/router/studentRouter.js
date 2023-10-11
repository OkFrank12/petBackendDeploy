"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const studentController_1 = require("../controller/studentController");
const upload = (0, multer_1.default)().single("avatar");
const student = express_1.default.Router();
student.route("/create-student").post(studentController_1.createStudent);
student.route("/all-student").get(studentController_1.getAllStudent);
student.route("/:studentID/one-student").get(studentController_1.getAStudent);
student.route("/:studentID/update-student-info").patch(studentController_1.updateStudentInfo);
student
    .route("/:studentID/update-student-image")
    .patch(upload, studentController_1.updateStudentImage);
student.route("/sign-in-student").post(studentController_1.signInStudent);
exports.default = student;
