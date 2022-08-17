import { AbstractControl } from '@angular/forms';

import { internationalEmailValidator } from './international-email-validator';

function validate(value: string) {
  expect(
    internationalEmailValidator({
      value,
    } as AbstractControl)
  ).toBe(null);
}

describe('internationalEmailValidator', () => {
  it('should work on valid email', () => {
    validate('t.steinmüller@pecht.de');
    validate('t.steinmüller+ü@pecht.de');
    validate('伊昭傑@郵件.商務');
    validate('राम@मोहन.ईन्फो');
    validate('θσερ@εχαμπλε.ψομ');
    validate('юзер@екзампл.ком');
  });

  it('should work on empty string', () => {
    validate('');
  });

  it('should NOT work on NON valid email', () => {
    expect(
      internationalEmailValidator({
        value: 'invalid-email',
      } as AbstractControl)
    ).toEqual({ invalidEmail: 'invalid-email' });
  });
});
