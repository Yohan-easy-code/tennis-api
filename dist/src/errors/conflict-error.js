"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const app_error_1 = require("./app-error");
class ConflictError extends app_error_1.AppError {
    constructor(message) {
        super(409, message);
    }
}
exports.ConflictError = ConflictError;
