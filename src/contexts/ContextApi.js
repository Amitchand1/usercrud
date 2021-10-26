import React, { createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // console.log(users, 'from user');
  // setUsers((currentState) => {
  //   return { ...currentState, user };
  // });
  const addUser = (user) => {
    if (localStorage.getItem('register_user') !== null) {
      const userContainer = JSON.parse(localStorage.getItem('register_user'));
      userContainer.push(user);
      localStorage.setItem('register_user', JSON.stringify(userContainer));
    } else {
      localStorage.setItem('register_user', JSON.stringify([user]));
    }
  };

  return (
    <AppContext.Provider
      value={{
        addUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
