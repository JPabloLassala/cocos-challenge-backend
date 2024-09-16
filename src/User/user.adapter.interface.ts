export interface IUserAdapter {
  findUserById(id: number): Promise<any>;
}
