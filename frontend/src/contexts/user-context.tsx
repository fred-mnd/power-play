import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../interfaces/user-interface";

const userContext = createContext({} as any);

type ContentLayout = {
  children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const ip = 'localhost';

  function updateUser(user: IUser | null) {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  async function login(email: string, pass: string) {
    try {
      const response = await axios.post(`http://localhost:8000/login`, {
        email: email,
        pass: pass
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return '';
      } else {
        return 'An error occurred.';
      }
    } catch (error) {
      return error.response?.data.error;
    }
  }

  const validate = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/validate`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    validate()
      .then((res: IUser) => {
        if (res && !user) {
          updateUser(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function isAuth() {
    return user !== null;
  }

  const data = { user, login, updateUser, validate, isAuth, ip };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUser() {
  return useContext(userContext);
}
