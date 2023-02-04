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

export const userDTOKeys: (keyof CreateUserDTOInterface)[] = [
  'login',
  'password',
];

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
