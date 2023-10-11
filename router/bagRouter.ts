import express from "express";
import { createBagRecord, viewBagRecord } from "../controller/bagController";

const bag = express.Router();

bag.route("/create-bag-record").post(createBagRecord);
bag.route("/:studentID/view-student-bag").get(viewBagRecord);

export default bag;
