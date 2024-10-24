import { type Schema } from "@repo/backend/amplify/data/resource";
import outputs from "@repo/backend/outputs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs);

export type AmplifyResponseType<T> = {
  data: T;
  errors?: {
    message: string;
    // path?: string;
    code?: string;
    // field?: string;
    // location: "input" | "query" | "mutation" | "subscription";
    [key: string]: any;
  }[];
};

export const generateAmplifyClient = () => {
  return generateClient<Schema>();
};

const client = generateAmplifyClient();

export type User = Schema["User"]["type"];
export type Team = Schema["Team"]["type"];
export type Resource = Schema["Resource"]["type"];
export type Reservation = Schema["Reservation"]["type"];

export const RESOURCE_TYPE = client.enums.ResourceType.values();
export type ResourceType = (typeof RESOURCE_TYPE)[number];

export const RESERVATION_STATUS = client.enums.ReservationStatus.values();
export type ReservationStatus = (typeof RESERVATION_STATUS)[number];
