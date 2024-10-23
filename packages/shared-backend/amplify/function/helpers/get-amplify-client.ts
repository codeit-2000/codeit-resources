// @ts-ignore
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import dotenv from "dotenv";

import config from "../../../amplify_outputs.json";
import { Schema } from "../../data/resource";
import atest from "./test.json";

dotenv.config();
Amplify.configure(config);

console.log(atest);
// export const client = generateClient<Schema>({
//   authMode: "lambda",
//   authToken: process.env.ADMIN_API_KEY,
// });
export const client = generateClient<Schema>();
