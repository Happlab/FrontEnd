import React, { createContext, useState } from "react";
import { setToken, getDataToken, deleteToken } from "../services/UserServices";

export const TokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
  const [tokenContext, setTokenContext] = useState(null);

  const setTokenUser = (newToken) => {
    setToken(newToken);
    setTokenContext(getDataToken(newToken));
  };

  const unsetTokenUser = () => {
    deleteToken();
    setTokenContext(null);
  };

  return (
    <TokenContext.Provider value={{ tokenUser: tokenContext, setTokenUser: setTokenUser, unsetTokenUser: unsetTokenUser }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
