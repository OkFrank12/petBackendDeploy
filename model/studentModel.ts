import mongoose from "mongoose";

interface iStudent {
  studentName: string;
  email: string;
  password: string;
  houseAddress: string;
  phoneNumber: number;
  studentImage: string;
  balance: number;
  gender: string;
  schoolName: string;
  studentImageId: string;
  feeHistory: {}[];
  bagHistory: Array<{}>;
}

interface iStudentData extends iStudent, mongoose.Document {}

const studentModel = new mongoose.Schema<iStudentData>(
  {
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
        type: mongoose.Types.ObjectId,
        ref: "bags",
      },
    ],
    feeHistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "fees",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iStudentData>("students", studentModel);
