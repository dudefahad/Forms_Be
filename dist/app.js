"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const google_document_1 = __importDefault(require("./routes/google-document"));
const user_1 = __importDefault(require("./routes/user"));
const constants_1 = require("./common/constants");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const pino_1 = require("./common/pino");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(constants_1.corsConfig));
app.use(google_document_1.default);
app.use(user_1.default);
mongoose_1.default.connect("mongodb+srv://sudeep_manasali:Sudeep%401234@googleformclone.urebd.mongodb.net/google_form_clone?retryWrites=true&w=majority")
    .then(() => {
    pino_1.logger.info("Moongoose connected successfully...");
    app.listen(process.env.PORT || 9000, () => {
        pino_1.logger.info(`Express server is up and running`);
    });
})
    .catch((err) => {
    pino_1.logger.error("Unable to connect the monog-db database ", err);
    pino_1.logger.error("App crashed");
    process.exit();
});
