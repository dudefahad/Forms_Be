"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: "*",
    allowedHeaders: [
        "Authorization",
        "X-Requested-With",
        "Content-Type",
        "x-auth-token",
    ],
    maxAge: 86400, // NOTICE: 1 day
    credentials: false,
};
