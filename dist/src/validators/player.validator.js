"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSchema = void 0;
const zod_1 = require("zod");
exports.playerSchema = zod_1.z.object({
    id: zod_1.z.number(),
    firstname: zod_1.z.string().min(1),
    lastname: zod_1.z.string().min(1),
    shortname: zod_1.z.string().min(1),
    sex: zod_1.z.enum(["M", "F"]),
    country: zod_1.z.object({
        picture: zod_1.z.string().url(),
        code: zod_1.z.string().min(2),
    }),
    picture: zod_1.z.string().url(),
    data: zod_1.z.object({
        rank: zod_1.z.number(),
        points: zod_1.z.number(),
        weight: zod_1.z.number(),
        height: zod_1.z.number(),
        age: zod_1.z.number(),
        last: zod_1.z.array(zod_1.z.number()),
    }),
});
