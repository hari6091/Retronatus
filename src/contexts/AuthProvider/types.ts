import { SignupType } from "../../screens/Signup/types";

interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  email?: string;
  username?: string;
  token?: string;
}

export interface IContext extends IUser {
  signIn: ({ email, password }: ILogin) => Promise<void>;
  signUp: (values: Omit<SignupType, "confPassword">) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
