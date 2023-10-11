import { Request, Response } from "express";
import bcrypt from "bcrypt";
import studentModel from "../model/studentModel";
import { uploadStream } from "../utils/stream";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { email, password, studentName, schoolName } = req.body;
    const salted = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salted);
    const student = await studentModel.create({
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
  } catch (error: any) {
    return res.status(404).json({
      message: "error created",
      data: error.message,
    });
  }
};

export const getAllStudent = async (req: Request, res: Response) => {
  try {
    const all = await studentModel.find();

    return res.status(200).json({
      message: "Get all students",
      data: all,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error getting all",
      data: error.message,
    });
  }
};

export const getAStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const one = await studentModel.findById(studentID);

    return res.status(200).json({
      message: "Get one student",
      data: one,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error getting one",
      data: error.message,
    });
  }
};

export const updateStudentInfo = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { houseAddress, gender, phoneNumber } = req.body;

    const student = await studentModel.findByIdAndUpdate(
      studentID,
      {
        gender,
        houseAddress,
        phoneNumber,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "updated",
      data: student,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error updating info",
      data: error.message,
    });
  }
};

export const updateStudentImage = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { secure_url, public_id }: any = await uploadStream(req);

    const student = await studentModel.findByIdAndUpdate(
      studentID,
      {
        studentImage: secure_url,
        studentImageId: public_id,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Updated Image",
      data: student,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error updating image",
      data: error.message,
    });
  }
};

export const signInStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const student = await studentModel.findOne({ email });

    if (student) {
      const checkPassword = await bcrypt.compare(password, student.password);
      if (checkPassword) {
        return res.status(201).json({
          message: "Signed in",
          data: student,
        });
      } else {
        return res.status(404).json({
          message: "Error with the password",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with student",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error signing in",
      data: error.message,
    });
  }
};
