export class Operator {
  constructor(
    public id: number,
    public name: string,
    public login: string,
    public password: string,
    public email: string,
    public isAdmin: boolean,
    public clientConfig: number) {
  }
}
