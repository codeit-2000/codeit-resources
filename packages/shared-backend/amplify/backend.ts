import { defineBackend } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { createReservationHandler } from "./function/createReservationHandler/resource";
import { deleteReservationHandler } from "./function/deleteReservationHandler/resource";
import { updateReservationHandler } from "./function/updateReservationHandler/resource";

const backend = defineBackend({
  auth,
  data,
  createReservationHandler,
  updateReservationHandler,
  deleteReservationHandler,
});

const tags = Tags.of(backend.stack);

tags.add("202410_InternA", "202410_InternA");
