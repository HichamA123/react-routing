import React, { createContext, useContext, useState } from 'react';


// Define types for the context
interface AuthContextType {
	userSession: string | null
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userSession, setUserSession] = useState<string | null>("test");


  return (
    <AuthContext.Provider value={{ userSession }}>
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
