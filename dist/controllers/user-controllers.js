"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const getUserById = (req, res) => {
    console.log(req);
    res.status(201).json({ message: 'Todo created successfully' });
};
exports.getUserById = getUserById;
