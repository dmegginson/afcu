import { User } from "./user";


export class NewUser extends User {
  confirmPassword: string = null;

  constructor(init?: Partial<NewUser>) {
    super();
    Object.assign(this, init);
  }

  public toString(): string {
    return `${super.toString()}, ${this.confirmPassword}`;
  }
}