import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, SetToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // console.log("this is token in auth provider: ", token);
    localStorage.setItem("token", token);

    const fetchUser = async (user_object, user_id) => { //using the try catch to add a user is a bad practice, we need to change it
      try {
        const logged_user = await axios.get(
          `http://localhost:8000/api/user/${user_id}`
        );
        if (logged_user.status === 200) {
          setUser(logged_user.data);
        } else {
          const new_user_object = {
            id: user_id,
            username: user_object.name,
          };
          const registered_user = await axios.post(
            "http://localhost:8000/api/user/",
            new_user_object
          );
          setUser(registered_user.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if(!token) {
      console.error("no token provided")
      setUser(null)
    } else {
      const user_object = jwtDecode(token); //problem when token is null
      // console.log("this is user object in auth provider: ", user_object);
      const user_id = user_object.sub;
      fetchUser(user_object, user_id);
    }

  }, [token]);

  console.log("from AuthProvider: ", token, user);

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, SetToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
