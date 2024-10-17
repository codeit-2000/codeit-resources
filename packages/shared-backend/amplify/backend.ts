import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Tags } from "aws-cdk-lib";

const backend = defineBackend({
  auth,
  data,
});

const tags = Tags.of(backend.stack);

tags.add("202410_InternA", "202410_InternA");
