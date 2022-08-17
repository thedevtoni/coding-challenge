import { FormGroup, ValidatorFn } from '@angular/forms';

export const haveLowercaseLetters = (password: string): boolean => {
  return /[a-z]/.test(password);
};

export const haveCapitalLetters = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

export const passwordHaveCorrectLength = (password: string): boolean => {
  return password.length >= 8;
};

export const passwordContainsUserInformation = (
  password: string,
  firstName: string,
  lastName: string
): boolean => {
  if (password.length === 0) return false;

  return [firstName, lastName]
    .filter(Boolean)
    .some((value: string) =>
      password.toLowerCase().includes(value.toLowerCase())
    );
};

export const passwordValidator: ValidatorFn =
  () =>
  (
    formGroup: FormGroup
  ): {
    invalidPassword: boolean;
  } | null => {
    const password = formGroup.get('password');
    const firstName = formGroup.get('firstName');
    const lastName = formGroup.get('lastName');

    if (!password) {
      return null;
    }

    return [
      haveLowercaseLetters(password.value),
      haveCapitalLetters(password.value),
      (firstName || lastName) &&
        !passwordContainsUserInformation(
          password.value,
          firstName?.value ?? '',
          lastName?.value ?? ''
        ),
    ].some(Boolean)
      ? null
      : { invalidPassword: true };
  };
