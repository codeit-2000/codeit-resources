import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "codeitResourcesDrive",
  access: (allow) => ({
    "profile-images/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write", "delete"]),
    ],
  }),
});
