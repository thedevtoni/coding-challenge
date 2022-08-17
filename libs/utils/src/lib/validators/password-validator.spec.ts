import {
  haveCapitalLetters,
  haveLowercaseLetters,
  passwordContainsUserInformation,
  passwordHaveCorrectLength,
} from './password-validator';

describe('passwordValidator', () => {
  describe('haveLowercaseLetters', () => {
    it('should return true if password contains lowercase letters', () => {
      expect(haveLowercaseLetters('abc')).toBeTruthy();
    });

    it('should return false if password does not contain lowercase letters', () => {
      expect(haveLowercaseLetters('ABC')).toBeFalsy();
    });
  });

  describe('haveCapitalLetters', () => {
    it('should return true if password contains capital letters', () => {
      expect(haveCapitalLetters('ABC')).toBeTruthy();
    });

    it('should return false if password does not contain capital letters', () => {
      expect(haveCapitalLetters('abc')).toBeFalsy();
    });
  });

  describe('passwordHaveCorrectLength', () => {
    it('should return true if password have correct length', () => {
      expect(passwordHaveCorrectLength('abcdefgh')).toBeTruthy();
    });

    it('should return false if password does not have correct length', () => {
      expect(passwordHaveCorrectLength('abc')).toBeFalsy();
    });

    it('should return false if password is empty', () => {
      expect(passwordHaveCorrectLength('')).toBeFalsy();
    });
  });

  describe('passwordContainsUserInformation', () => {
    it('should return true if password contains user information', () => {
      expect(
        passwordContainsUserInformation('abcdefgh', 'abc', 'def')
      ).toBeTruthy();
    });

    it('should return false if password does not contain user information', () => {
      expect(
        passwordContainsUserInformation('abcdefgh', 'def', 'ghi')
      ).toBeTruthy();
    });

    it('should return false if password is empty', () => {
      expect(passwordContainsUserInformation('', '', '')).toBeFalsy();
    });

    it('should return false if firstName is empty', () => {
      expect(
        passwordContainsUserInformation('abcdefgh', '', 'ghi')
      ).toBeFalsy();
    });

    it('should return false if lastName is empty', () => {
      expect(
        passwordContainsUserInformation('abcdefgh', 'abc', '')
      ).toBeTruthy();
    });
  });
});
