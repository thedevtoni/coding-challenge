import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateUserPayload, User } from './models';
import { USERS_API_URL } from './tokens';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    @Inject(USERS_API_URL) private usersApi: string,
    private http: HttpClient
  ) {}

  public createUser(payload: CreateUserPayload) {
    return this.http.post<User>(this.usersApi, payload);
  }
}
