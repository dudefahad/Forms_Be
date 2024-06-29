"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// search user by id
router.get('/:id', user_1.getUserByIdController);
// login the user
router.post('/login', user_1.signInUserController);
// create new user
router.post('/register', user_1.signUpUserController);
exports.default = router;
