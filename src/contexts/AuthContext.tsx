import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
// import { useApp } from './AppContext';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
interface UserProfile {
  uid: string;
  email: string;
  isAdmin: boolean;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiUrl = "https://api.t-track.rivieraapps.com/api/";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Get user profile from API
        try {
          var url = apiUrl + "users" + "/" + user.uid
          const response = await fetch( url, { method: "GET" });
          if (!response.ok) throw new Error('Request failed');
          console.log("response", response.body)
          // setUserProfile(response.body.json() as UserProfile);
        }catch (error) {
          console.log("ERROR: couldn't retrive user", error)
        }
        
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // Create default user profile
            const defaultProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              isAdmin: false,
              displayName: user.displayName || undefined
            };
            await setDoc(doc(db, 'users', user.uid), defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback for demo purposes
          setUserProfile({
            uid: user.uid,
            email: user.email || '',
            isAdmin: user.email === 'admin@t-track.com', // Demo admin check
            displayName: user.displayName || undefined
          });
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: result.user.uid,
      email: result.user.email || '',
      isAdmin: email === 'admin@t-track.com', // Demo admin check
      displayName
    };
    try {
      var url = apiUrl + "users"
      const response = await fetch( url, {
        method: "POST", body: JSON.stringify( userProfile )
      });
      if (!response.ok) throw new Error('Request failed');
    }catch (error) {
      console.log("ERROR: couldn't save user", error)
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    isAdmin: userProfile?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};