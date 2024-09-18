import { User } from "./user.entity";

export interface IUserAdapter {
  getUserById(id: number): Promise<User>;
}
