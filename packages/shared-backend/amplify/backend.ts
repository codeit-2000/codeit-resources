import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";
import { Function, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";

import { auth } from "./auth/resource";
import { data } from "./data/resource";

// import { createConfirmedReservation } from "./function/createConfirmedReservation/resource";
// import { deleteReservationById } from "./function/deleteReservationById/resource";
// import { updateReservationById } from "./function/updateReservationById/resource";

// const authFunction = defineFunction({
//   entry: "./data/custom-authorizer.ts",
//   // environment: {
//   //   ADMIN_API_KEY: process.env.ADMIN_API_KEY!,
//   // },
// });
const createConfirmedReservation = defineFunction({
  entry: "./function/createConfirmedReservation/handler.ts",
  // environment: {
  //   ADMIN_API_KEY: process.env.ADMIN_API_KEY!,
  // },
});
const deleteReservationById = defineFunction({
  entry: "./function/deleteReservationById/handler.ts",
  // environment: {
  //   ADMIN_API_KEY: process.env.ADMIN_API_KEY!,
  // },
});
const updateReservationById = defineFunction({
  entry: "/function/updateReservationById/handler.ts",
  // environment: {
  //   ADMIN_API_KEY: process.env.ADMIN_API_KEY!,
  // },
});

const backend = defineBackend({
  auth,
  data,
  // authFunction,
  createConfirmedReservation,
  updateReservationById,
  deleteReservationById,
});

const tags = Tags.of(backend.stack);

tags.add("202410_InternA", "202410_InternA");

// eslint-disable-next-line @typescript-eslint/ban-types
// const underlyingAuthLambda = backend.authFunction.resources.lambda as Function;
// underlyingAuthLambda.addEnvironment(
//   "ADMIN_API_KEY",
//   process.env.ADMIN_API_KEY!,
// );

const outputs = {} as { [key: string]: string };
[
  { name: "createConfirmedReservation" },
  { name: "updateReservationById" },
  { name: "deleteReservationById" },
].forEach((functionInfo) => {
  const underlyingLambda =
    // eslint-disable-next-line
    (backend as any)[functionInfo.name].resources.lambda as Function;
  // underlyingLambda.addEnvironment("ADMIN_API_KEY", process.env.ADMIN_API_KEY!);

  const functionUrl = underlyingLambda.addFunctionUrl({
    authType: FunctionUrlAuthType.NONE,
    cors: {
      allowedOrigins: ["*"],
      allowedHeaders: ["*"],
    },
  });
  outputs[functionInfo.name] = functionUrl.url;
});
backend.addOutput({
  custom: outputs,
});
