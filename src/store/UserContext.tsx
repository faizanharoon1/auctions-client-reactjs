import  { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../models/user-model';



interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({name:"None"});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
