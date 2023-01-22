"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
//routes
const createlib_1 = __importDefault(require("./routes/createlib"));
const auth_1 = __importDefault(require("./routes/auth"));
//https://jonathan-holloway.medium.com/node-and-express-session-a23eb36a052
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.set("trust proxy", 1);
app.use((0, express_session_1.default)({
    name: `authSession`,
    secret: `swapperdev`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000 * 20, // 20 min
    },
}));
app.use("/createlib", createlib_1.default);
app.use("/auth", auth_1.default);
//error handling
app.use(((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
}));
//mongo db
mongoose_1.default
    .connect("mongodb://localhost:27017")
    .then((result) => {
    app.listen(8080);
})
    .catch((err) => console.log(err));