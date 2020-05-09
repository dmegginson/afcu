

export class User {
  id: string = null;
  username: string = null;
  password: string = null;
  fullName: string = null;
  phoneNumber: string = null;
  lastLoggedIn: Date = null;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  public toString(): string {
    return `${this.id}, ${this.username}, ${this.password}, ${this.fullName}, ${this.phoneNumber}, ${this.lastLoggedIn}`;
  }
}