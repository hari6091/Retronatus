import React, { createContext, useEffect, useMemo, useState } from "react";

import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, setUserLocalStorage } from "./utils";
import api from "../../services/api";
import { SignupType } from "../../screens/Signup/types";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<Promise<IUser | null> | IUser | null>();

  useEffect(() => {
    const users = getUserLocalStorage();

    if (users) {
      setUser(users);
    }
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const req = await api.post("/Usuario/login", { email, password });
      const payload = { token: req.data };

      setUser(payload);
      setUserLocalStorage(payload);
    } catch (error) {
      throw new Error("Falha ao fazer login " + error);
    }
  };

  const signUp = async ({ name, email, password }: SignupType) => {
    try {
      const request = await api.post("/Usuario", {
        name,
        email,
        password,
        is_Super_Admin: false,
      });

      return request.data;
    } catch {
      return new Error("O cadastro falhou.");
    }
  };

  const logout = () => {
    setUser(null);
    setUserLocalStorage(null);
  };

  const auth = useMemo(() => ({ ...user, signIn, signUp, logout }), [user]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
