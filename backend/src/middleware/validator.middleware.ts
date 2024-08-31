import { validators } from "../utils";

export const SignupValidator = [
  validators.nameValidator,
  validators.emailValidator,
  validators.passwordValidator,
  validators.phoneValidator,
  validators.usernameValidator,
  validators.validationErrorHandler
];

export const SigninValidator = [
  validators.usernameValidator,
  validators.passwordValidator,
  validators.validationErrorHandler
];
