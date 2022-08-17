interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
}

export type CreateUserPayload = BaseUser;

export interface User extends BaseUser {
  _id: string;
}
