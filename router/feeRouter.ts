import express from "express";
import { createFeeRecord, viewFeeRecord } from "../controller/feeController";

const fee = express.Router();

fee.route("/create-fee-record").post(createFeeRecord);
fee.route("/:studentID/view-student-fee").get(viewFeeRecord);

export default fee;
