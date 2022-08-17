import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService, USERS_API_URL } from '@coding-challenge/services/users';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let usersService: UsersService;

  const mockFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'Password',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: USERS_API_URL,
          useValue: '/users',
        },
        {
          provide: NzMessageService,
          useValue: {
            success: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(() => of()),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be invalid when the form inputs are not filled', () => {
      expect(component.form.invalid).toBeTruthy();
    });

    describe('value', () => {
      beforeEach(() => {
        component.form.patchValue(mockFormData);
      });

      it('should be valid when the form inputs are filled and validated', () => {
        expect(component.form.valid).toBeTruthy();
      });

      it('should be equal to the mock form data', () => {
        expect(component.form.value).toStrictEqual(mockFormData);
      });

      it('should return the correct values in all getters', () => {
        expect(component.firstNameValue).toBe(mockFormData.firstName);
        expect(component.lastNameValue).toBe(mockFormData.lastName);
        expect(component.emailValue).toBe(mockFormData.email);
        expect(component.passwordValue).toBe(mockFormData.password);
      });
    });

    describe('password validation', () => {
      it('should be invalid when the password is not filled', () => {
        expect(component.form.controls.password.invalid).toBeTruthy();
      });

      it('should be invalid when the password is less than 8 characters', () => {
        component.form.patchValue({ password: '1234567' });
        expect(component.passwordHaveCorrectLength).toBeFalsy();
      });

      it('should be invalid when the password does not have at least one lowercase letter', () => {
        component.form.patchValue({ password: 'PASSWORD' });
        expect(component.haveAtLeastOneLetter).toBeFalsy();
      });

      it('should be invalid when the password does not have at least one capital letter', () => {
        component.form.patchValue({ password: 'password' });
        expect(component.haveCapitalLetters).toBeFalsy();
      });

      it('should be invalid when the password does not have at least one number', () => {
        component.form.patchValue({ password: 'Password', firstName: 'pass' });
        expect(component.noPersonalInformation).toBeFalsy();
      });
    });

    describe('user creation', () => {
      beforeEach(() => {
        component.form.patchValue(mockFormData);
      });

      it('should create a user when the form is valid', () => {
        const spy = jest.spyOn(usersService, 'createUser');

        component.createUser();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
