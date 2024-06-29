"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// type numOrString = number | string 
// const body = res.body as Todo 
router.get('/', (req, res, next) => {
    res.status(200).send('Hello world !!!');
});
exports.default = router;
