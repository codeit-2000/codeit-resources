/* eslint-disable no-console */
import {
  AdminAddUserToGroupCommand,
  AdminConfirmSignUpCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
});

// 유저를 특정 그룹에 추가
const addUserToGroup = async (email: string, groupName: string) => {
  const params = {
    GroupName: groupName,
    UserPoolId: "ap-northeast-2_JjCNX3vJl",
    Username: email,
  };

  try {
    const command = new AdminAddUserToGroupCommand(params);
    await cognitoClient.send(command);
    return true;
  } catch (error) {
    return false;
  }
};

// Cognito에서 바로 사용자 확인 (이메일 인증 없이 활성화)
const confirmUserInCognito = async (email: string) => {
  const adminConfirmParams = {
    UserPoolId: "ap-northeast-2_JjCNX3vJl",
    Username: email,
  };

  try {
    const command = new AdminConfirmSignUpCommand(adminConfirmParams);
    await cognitoClient.send(command);
    return true;
  } catch (error) {
    return false;
  }
};

// 이메일 확인 여부를 강제로 "예"로 설정
const verifyUserEmail = async (email: string) => {
  const updateParams = {
    UserPoolId: "ap-northeast-2_JjCNX3vJl",
    Username: email,
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };

  try {
    const command = new AdminUpdateUserAttributesCommand(updateParams);
    await cognitoClient.send(command);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @description 자동으로 유저를 그룹에 추가하고, 이메일 인증해줌
 *
 * @param groupName MEMBER | ADMIN
 * @param email 유저 이메일
 */
export const autoAuthUser = async (
  groupName: string,
  email: string,
): Promise<boolean> => {
  try {
    const addedToGroup = await addUserToGroup(email, groupName);
    if (!addedToGroup) {
      console.error(
        `사용자 ${email}를 그룹 ${groupName}에 추가하는데 실패했습니다.`,
      );
      return false;
    }

    const confirmed = await confirmUserInCognito(email);
    if (!confirmed) {
      console.error(`사용자 ${email}를 확인하는데 실패했습니다.`);
      return false;
    }

    const verified = await verifyUserEmail(email);
    if (!verified) {
      console.error(`사용자 ${email}의 이메일을 확인하는데 실패했습니다.`);
      return false;
    }

    console.log(`사용자 ${email}의 인증 프로세스가 성공적으로 완료되었습니다.`);
    return true;
  } catch (error) {
    console.error("사용자 인증 프로세스 중 오류 발생:", error);
    return false;
  }
};
