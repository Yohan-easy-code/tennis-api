"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const app_error_1 = require("../errors/app-error");
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: {
                message: "Invalid request data",
                details: err.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            },
        });
        return;
    }
    if (err instanceof app_error_1.AppError) {
        res.status(err.statusCode).json({
            error: {
                message: err.message,
            },
        });
        return;
    }
    console.error(err);
    res.status(500).json({
        error: {
            message: "Internal server error",
        },
    });
};
exports.errorMiddleware = errorMiddleware;
