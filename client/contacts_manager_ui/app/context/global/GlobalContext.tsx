"use client";
import { getToken, getUser, TokenType } from "@/app/lib/actions";
import { refreshUserToken } from "@/app/services/api/auth/auth";
import { User } from "@/app/services/api/auth/types";
import { updateBearerToken } from "@/app/utils/updateBearerToken";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const GlobalContext = createContext({} as ContextType);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    getUser().then((response) => {
      response ? setUser(response) : setUser(null);
    });
    setAccessOrRefresh("contact_manager_access_token", setAccessToken);
    setAccessOrRefresh("contact_manager_refresh_token", setRefreshToken);
  }, []);

  const handleRefresh = () => {
    refreshUserToken(refreshToken)
      .then((response) => {
        if (response) {
          updateBearerToken(response.access);
        }
      })
      .finally(() => {
        setTimeout(() => {
          handleRefresh();
        }, 30000);
      });
  };

  useEffect(() => {
    if (user) {
      if (accessToken) {
        updateBearerToken(accessToken);
        handleRefresh();
      }
    }
  }, [user, accessToken]);

  const setAccessOrRefresh = (
    type: TokenType,
    setToken: Dispatch<SetStateAction<string>>
  ) => {
    getToken(type).then((token) => {
      token && setToken(token);
    });
  };

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {user && accessToken && refreshToken ? children : null}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
