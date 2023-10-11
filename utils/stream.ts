import streamifier from "streamifier";
import { Request } from "express";
import cloudinary from "../config/cloudinary";

export const uploadStream = async (req: any) => {
  return new Promise(async (resolve, reject) => {
    let stream = await cloudinary.uploader.upload_stream((err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};
