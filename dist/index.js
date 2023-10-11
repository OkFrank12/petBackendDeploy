"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const studentRouter_1 = __importDefault(require("./router/studentRouter"));
const bagRouter_1 = __importDefault(require("./router/bagRouter"));
const feeRouter_1 = __importDefault(require("./router/feeRouter"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURL = process.env.MONGO_URL;
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", studentRouter_1.default);
app.use("/api", bagRouter_1.default);
app.use("/api", feeRouter_1.default);
app.use((0, morgan_1.default)("dev"));
app.listen(process.env.PORT || port, () => {
    mongoose_1.default.connect(mongoURL).then(() => {
        console.log(`My MongoDB database is connected ${mongoose_1.default.connection.host}`);
    });
});
