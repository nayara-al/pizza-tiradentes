/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";

import api from "../services/api";
import { IUser } from "../interfaces/IUser";
import { USER_KEY } from "../constants/auth";
import { useNavigate } from "react-router-dom";

interface SignInCredencials {
  email: string;
  password: string;
}

interface SignUpCredencials {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: IUser | null;
}

interface AuthContextData {
  user: IUser | null;
  signIn(credencials: SignInCredencials): Promise<void>;
  signUp(credentials: {
    name: string;
    email: string;
    password: string;
  }): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem(USER_KEY);
    return { user: user ? JSON.parse(user) : null };
  });

  const signIn = useCallback(async ({ email, password }: SignInCredencials) => {
    try {
      const response = await api.get<IUser[]>(`/usuarios?email=${email}`);

      if (response.data.length === 0) {
        throw new Error("Usuário não encontrado");
      }

      const user = response.data[0];
      if (user.password !== password) {
        throw new Error("Senha incorreta");
      }

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setData({ user });
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Erro ao fazer login. Verifique suas credenciais.");
    }
  }, []);

  const signUp = useCallback(
    async ({ name, email, password }: SignUpCredencials) => {
      await api.post("/users", {
        name,
        email,
        password,
        password_confirmation: password,
      });
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(USER_KEY);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
