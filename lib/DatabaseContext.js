import React, { useContext, useState } from "react";

export const database = {
  users: [],
};

export const StateContext = React.createContext({
  state: undefined,
  setState: async (state) => null,
});

export const useDatabase = () => useContext(StateContext);

export const DatabaseProvider = ({ children }) => {
  const [state, setState] = useState(database);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};
