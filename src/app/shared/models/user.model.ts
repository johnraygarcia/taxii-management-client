export class User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;

  constructor(name: string, email: string, password: string, passwordConfirmation) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password_confirmation = passwordConfirmation;
  }
}
