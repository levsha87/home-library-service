export interface CreateUserDTOInterface {
  login: string;
  password: string;
}

export interface UserInterface extends CreateUserDTOInterface {
  id: string; // uuid v4
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface UserResponseInterface {
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  login: string;
}

export interface UpdatePasswordDtoInterface {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
