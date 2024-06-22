import { createContext, useContext, useState } from "react";
import { IUser } from "../interfaces/user-interface";

const userContext = createContext<{auth: IUser|null}>({auth: null});

type ContentLayout = {
  children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
  const [auth, setAuth] = useState<IUser|null>({
    ID: 1,
    Name: "efzet",
    Email: "efzet@gmail.com",
    PhoneNumber: "08111223",
    Address: "Jl. Efzet",
    Money: 100000
  });

  // Authenticate logic here VVV
  function isAuth() {
    return auth;
  }

  // You can pass all user data in here V (Global Data)
  const data = { setAuth, auth, isAuth };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
  return useContext(userContext);
}
