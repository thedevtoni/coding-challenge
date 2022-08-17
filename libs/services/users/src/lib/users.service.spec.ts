import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { USERS_API_URL } from './tokens';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
  };
  const mockUserReponse = {
    ...mockUser,
    _id: '123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: USERS_API_URL,
          useValue: '/users',
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should work', () => {
    expect(service).toBeDefined();
  });

  it('should call createUser and return the created user', () => {
    service.createUser(mockUser).subscribe((res) => {
      expect(res).toEqual(mockUserReponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `/users`,
    });

    req.flush(mockUserReponse);
  });
});
