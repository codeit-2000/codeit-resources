const LOGIN_ERROR_MESSAGES: { [key: string]: string } = {
  UserAlreadyAuthenticatedException: "이미 로그인 한 상태입니다.",
  NotAuthorizedException: "아이디 또는 비밀번호가 잘못되었습니다.",
  UserNotFoundException: "해당 사용자를 찾을 수 없습니다.",
  UserNotConfirmedException: "이메일 인증이 완료되지 않았습니다.",
  PasswordResetRequiredException: "비밀번호를 재설정해야 합니다.",
  TooManyFailedAttemptsException:
    "로그인 시도가 너무 많아 계정이 잠겼습니다. 잠시 후 다시 시도해주세요.",
  LimitExceededException: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  UnknownError: "로그인 중 알 수 없는 오류가 발생했습니다.",
};

export { LOGIN_ERROR_MESSAGES };
