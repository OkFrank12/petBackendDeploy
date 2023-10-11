import { Request, Response } from "express";
import feeModel from "../model/feeModel";
import studentModel from "../model/studentModel";
import mongoose from "mongoose";

export const createFeeRecord = async (req: Request, res: Response) => {
  try {
    const { cash, email } = req.body;
    const findStudent = await studentModel.findOne({ email });
    if (findStudent) {
      const feeInfo = await feeModel.create({
        cash,
        studentID: findStudent._id,
        schoolName: findStudent.schoolName,
      });

      if (cash < findStudent?.balance) {
        await studentModel.findByIdAndUpdate(
          findStudent?._id,
          {
            balance: findStudent?.balance - feeInfo?.cash,
          },
          { new: true }
        );

        findStudent?.feeHistory.push(new mongoose.Types.ObjectId(feeInfo?._id));
        findStudent?.save();

        return res.status(201).json({
          message: "created fee",
          data: feeInfo,
        });
      } else {
        return res.status(404).json({
          message: "Insufficient Fee",
        });
      }
    } else {
      return res.status(404).json({
        message: "no student match",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating fee",
      data: error,
    });
  }
};

export const viewFeeRecord = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const populateFeeHistory = await studentModel.findById(studentID).populate({
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
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing fee",
      data: error.message,
    });
  }
};
