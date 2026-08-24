import { z } from "zod";

export const playerSchema = z.object({
  id: z.number(),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  shortname: z.string().min(1),
  sex: z.enum(["M", "F"]),

  country: z.object({
    picture: z.string().url(),
    code: z.string().min(2),
  }),

  picture: z.string().url(),

  data: z.object({
    rank: z.number(),
    points: z.number(),
    weight: z.number(),
    height: z.number(),
    age: z.number(),
    last: z.array(z.number()),
  }),
});
