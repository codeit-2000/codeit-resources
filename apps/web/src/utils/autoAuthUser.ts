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
    UserPoolId: import.meta.env.VITE_USER_POOL_ID,
    Username: email,
  };

  try {
    const command = new AdminAddUserToGroupCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    // console.error(error);
  }
};

// Cognito에서 바로 사용자 확인 (이메일 인증 없이 활성화)
const confirmUserInCognito = async (email: string) => {
  const adminConfirmParams = {
    UserPoolId: import.meta.env.VITE_USER_POOL_ID,
    Username: email,
  };

  try {
    const command = new AdminConfirmSignUpCommand(adminConfirmParams);
    await cognitoClient.send(command);
  } catch (error) {
    // console.error(error);
  }
};

// 이메일 확인 여부를 강제로 "예"로 설정
const verifyUserEmail = async (email: string) => {
  const updateParams = {
    UserPoolId: import.meta.env.VITE_USER_POOL_ID,
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
  } catch (error) {
    // console.error(error);
  }
};

/**
 * @description 자동으로 유저를 그룹에 추가하고, 이메일 인증해줌
 *
 * @param groupName MEMBER | ADMIN
 * @param email 유저 이메일
 */
export const autoAuthUser = (groupName: string, email: string) => {
  addUserToGroup(email, groupName);
  confirmUserInCognito(email);
  verifyUserEmail(email);
};
