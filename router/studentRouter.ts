import express from "express";
import multer from "multer";
import {
  createStudent,
  getAStudent,
  getAllStudent,
  signInStudent,
  updateStudentImage,
  updateStudentInfo,
} from "../controller/studentController";

const upload = multer().single("avatar");

const student = express.Router();

student.route("/create-student").post(createStudent);
student.route("/all-student").get(getAllStudent);
student.route("/:studentID/one-student").get(getAStudent);
student.route("/:studentID/update-student-info").patch(updateStudentInfo);
student
  .route("/:studentID/update-student-image")
  .patch(upload, updateStudentImage);
student.route("/sign-in-student").post(signInStudent);

export default student;
