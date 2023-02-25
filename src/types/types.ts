export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  email: string;
  phoneNumber: string;
  name: string;
  image: string;
  friends: string[];
  enemies: string[];
}
