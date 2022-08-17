import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '@coding-challenge/services/users';
import {
  haveCapitalLetters,
  haveLowercaseLetters,
  internationalEmailValidator,
  passwordContainsUserInformation,
  passwordHaveCorrectLength,
  passwordValidator,
} from '@coding-challenge/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, finalize, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public form = this.fb.nonNullable.group(
    {
      firstName: this.fb.nonNullable.control('', Validators.required),
      lastName: this.fb.nonNullable.control('', Validators.required),
      email: this.fb.nonNullable.control(
        '',
        Validators.compose([Validators.required, internationalEmailValidator])
      ),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        passwordValidator,
      ]),
    },
    {
      validators: [passwordValidator],
    }
  );

  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private message: NzMessageService
  ) {}

  public get passwordValue(): string {
    return this.form.controls.password.value;
  }

  public get firstNameValue(): string {
    return this.form.controls.firstName.value;
  }

  public get emailValue(): string {
    return this.form.controls.email.value;
  }

  public get lastNameValue(): string {
    return this.form.controls.lastName.value;
  }

  public get haveAtLeastOneLetter() {
    return haveLowercaseLetters(this.passwordValue);
  }

  public get passwordHaveCorrectLength() {
    return passwordHaveCorrectLength(this.passwordValue);
  }

  public get haveCapitalLetters() {
    return haveCapitalLetters(this.passwordValue);
  }

  public get noPersonalInformation() {
    return !passwordContainsUserInformation(
      this.passwordValue,
      this.firstNameValue,
      this.lastNameValue
    );
  }

  public createUser(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.loading$.next(true);

    this.usersService
      .createUser({
        firstName: this.firstNameValue,
        lastName: this.lastNameValue,
        email: this.emailValue,
      })
      .pipe(
        take(1),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: () => {
          this.message.success(`User with email ${this.emailValue} created`);
          this.form.reset({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
        },
        error: () => {
          this.message.error('Error creating user. Try again later');
        },
      });
  }
}
