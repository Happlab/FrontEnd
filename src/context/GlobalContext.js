import React, { createContext, useState } from "react";
import user_services from "../services/UserServices";

export const TokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const setTokenUser = (newToken) => {
    user_services.setToken(newToken);
    setToken(user_services.getDataToken(newToken));
  };

  return (
    <TokenContext.Provider value={{ tokenUser: token, setTokenUser: setTokenUser }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
