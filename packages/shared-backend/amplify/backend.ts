import { defineBackend } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";

const backend = defineBackend({
  auth,
  data,
  storage,
});

const tags = Tags.of(backend.stack);

tags.add("202410_InternA", "202410_InternA");
