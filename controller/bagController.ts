import { Request, Response } from "express";
import bagModel from "../model/bagModel";
import mongoose from "mongoose";
import studentModel from "../model/studentModel";

export const createBagRecord = async (req: Request, res: Response) => {
  try {
    const { bag, email } = req.body;
    const findStudent = await studentModel.findOne({ email });
    if (findStudent) {
      const bagInfo = await bagModel.create({
        bag,
        cash: bag * 200,
      });

      await studentModel.findByIdAndUpdate(
        findStudent._id,
        {
          balance: findStudent?.balance + bagInfo?.cash,
        },
        { new: true }
      );

      findStudent?.bagHistory.push(new mongoose.Types.ObjectId(bagInfo?._id));
      findStudent.save();

      return res.status(201).json({
        message: "created",
        data: bagInfo,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating bag record",
      data: error.message,
    });
  }
};

export const viewBagRecord = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const populateBagHistory = await studentModel.findById(studentID).populate({
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
  } catch (error: any) {
    return res.status(404).json({
      message: "error viewing",
      data: error.message,
    });
  }
};
