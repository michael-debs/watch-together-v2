"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children, user }: { children: ReactNode, user: UserType | null }) {

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
