import { defineBackend } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { createConfirmedReservation } from "./function/createConfirmedReservation/resource";
import { deleteReservationById } from "./function/deleteReservationById/resource";
import { updateReservationById } from "./function/updateReservationById/resource";

const backend = defineBackend({
  auth,
  data,
  createConfirmedReservation,
  updateReservationById,
  deleteReservationById,
});

const tags = Tags.of(backend.stack);

tags.add("202410_InternA", "202410_InternA");
