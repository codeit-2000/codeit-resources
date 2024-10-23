import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import outputs from "../../../amplify_outputs.json";
import type { Schema } from "../../data/resource";

// import { client } from "../helpers/get-amplify-client";

Amplify.configure(outputs);

export const handler: Schema["createConfirmedReservation"]["functionHandler"] =
  async (event, context) => {
    const client = generateClient<Schema>({
      authMode: "userPool",
      authToken: event.request.headers.authorization,
    });

    console.log("이ㅁㄴㅇㄹㅁㄴㅇ트", event);
    console.log("콘탟ㅌㅌㅇㄹㅇㅌㄹㄴㄹ", context);

    const { resourceId, startTime, endTime } = event.arguments;

    // 입력값 검증
    if (!startTime || !endTime || new Date(startTime) >= new Date(endTime)) {
      throw new Error("유효한 시작 시간과 종료 시간을 입력해주세요.");
    }
    // 1. 예약이 겹치는지 확인하는 쿼리
    const { data: existingReservations } =
      await client.models.Reservation.listByResource({
        resourceId: resourceId,
        date: {
          eq: new Date().toISOString().split("T")[0],
        },
      });

    console.log(JSON.stringify(existingReservations));

    // 2. 충돌하는 예약이 있는지 확인
    const isConflict = (existingReservations || []).some((reservation) => {
      return (
        reservation &&
        new Date(startTime) < new Date(reservation.endTime) &&
        new Date(endTime) > new Date(reservation.startTime)
      );
    });
    if (isConflict) {
      throw new Error("해당 시간에 이미 예약이 있습니다.");
    }
    // 3. 충돌이 없으면 예약 생성
    const { data } = await client.models.Reservation.create({
      ...event.arguments,
      status: "CONFIRMED",
    });
    console.log(JSON.stringify(data));
    return `${JSON.stringify(data)}`;
  };
// import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
// import { Schema } from "aws-amplify/datastore";
// import { identifyUser } from "aws-amplify/in-app-messaging";

// let dynamoDBClientParams = { region: "ap-northeast-2" };

// if (process.env.IS_OFFLINE) {
//   dynamoDBClientParams = {
//     region: "localhost",
//     // endpoint: 'http://localhost:8000',
//     // accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
//     // secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
//   };
// }

// const client = new DynamoDBClient({});
// const ddbDocClient = DynamoDBDocumentClient.from(client);

// const env = process.env.ENV;
// const AppsyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
// const TableName = `Reservation-${AppsyncID}-${env}`; // TableName-AppsyncID-env

// // const params = {
// //   TableName,
// //   Key: {
// //     id: event.arguments.id,
// //   },
// // };

// const getReservation = async (id: string) => {
//   const command = new GetItemCommand({
//     TableName: `Reservation-${AppsyncID}-${env}`,
//     Key: marshall({
//       id,
//     }),
//   });

//   const response = await client.send(command);
//   return response;
// };

// export const handler: Schema["createConfirmedReservation"]["functionHandler"] =
//   async (event) => {
//     const { resourceId, startTime, endTime } = event.arguments;
//     // 입력값 검증
//     if (!startTime || !endTime || new Date(startTime) >= new Date(endTime)) {
//       throw new Error("유효한 시작 시간과 종료 시간을 입력해주세요.");
//     }
//     // 1. 예약이 겹치는지 확인하는 쿼리
//     const { data: existingReservations } =
//       await client.models.Reservation.listByResource({
//         resourceId: resourceId,
//         date: {
//           eq: new Date().toISOString().split("T")[0],
//         },
//       });
//     // 2. 충돌하는 예약이 있는지 확인
//     const isConflict = (existingReservations || []).some((reservation) => {
//       return (
//         reservation &&
//         new Date(startTime) < new Date(reservation.endTime) &&
//         new Date(endTime) > new Date(reservation.startTime)
//       );
//     });
//     if (isConflict) {
//       throw new Error("해당 시간에 이미 예약이 있습니다.");
//     }
//     // 3. 충돌이 없으면 예약 생성
//     const { data } = await client.models.Reservation.create({
//       ...event.arguments,
//       status: "CONFIRMED",
//     });
//     console.log(JSON.stringify(data));
//     return "test";
//   };
