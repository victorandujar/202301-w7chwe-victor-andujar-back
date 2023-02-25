export interface UserLogin {
  username: string;
}

export interface UserRegister extends UserLogin {
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
  image: string;
  friends: string[];
  enemies: string[];
}
