import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import users from "../assets/users.json"
import { hashPassword, ToastTypes, triggerToast } from '../utils';

// Define types for the context
type AuthContextType = {
	isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// gets stored in a cookie
type UserSession = {
  // no need for a token because userUUid is enough for knowing isLoggedIn as well as which user is logged in
  userUuid: string
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Check if the user is logged in (double negate to make the value a boolean)
  const isLoggedIn = !!userSession?.userUuid;

  // On component mount, fetch session information from cookies
  useEffect(() => {
    const userSessionString = Cookies.get('userSession'); // Assuming your session token is stored in a cookie called 'userSession'
    if (userSessionString) {
      const userSession = JSON.parse(userSessionString) as UserSession;
      setUserSession(userSession as UserSession); // Set the session from the cookie

      //TODO could replace the cookie with an extended expiration date to act as refreshing the session whenever the user (re)loads webapp
    }

    // no userSession means user has never logged in or the cookie got deleted/expired
  }, []);

  // Login function to login and store session in state and cookie
  const login = useCallback(async (username: string, password: string) => {

    const user = users.find(user => user.username === username)
    if (!user) throw new Error("Username not found.")

    let success = false
    success = user.password === await hashPassword(password)

    if (!success) throw new Error("Invalid password. Please try again.")

    //set userSession cookie
    const userSession: UserSession = {
      userUuid: user.uuid
    }

    // Create a Date object 5 minute from now
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5); // Add 5 minutes to the current time

    setUserSession(userSession);
    Cookies.set('userSession', JSON.stringify(userSession), { expires: date }); // Store token in cookie with a 5-minute expiration
  }, []) //if users would be dynamically loaded (like from the backend) and stored in a usestore, the dependency array should then have that variable

  // Logout function to clear session and remove cookie
  const logout = useCallback(() => {
    // if you want to go to home page after logout: do the navigate to home page first then clear all usersession data, because else the user will be navigated to login page because the isLoggedIn is being watched in PrivateRoute component
    setUserSession(null);
    Cookies.remove('userSession'); // Remove session cookie
    triggerToast("succesfully logged out.", ToastTypes.SUCCESS)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
