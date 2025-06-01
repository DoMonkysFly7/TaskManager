"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase"; // configurarea Firebase

// Cream contextul global care va ține informațiile despre autentificare
const AuthContext = createContext({
  user: null,               
  loading: true,           
  logout: async () => {},  
});

// Furnizorul de autentificare – învelește toată aplicația
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // La montarea componentei, verificăm dacă cineva este logat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);     
      setLoading(false);         
    });

    return unsubscribe; // ne dezabonăm automat când componenta dispare
  }, []);

  // Funcție de delogare: cheamă `signOut` de la Firebase
  const logout = () => signOut(auth);
  
  // Oferim datele despre autentificare tuturor componentelor copil
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children} {/* orice componentă copil: pagini, butoane, etc */}
    </AuthContext.Provider>
  );
};

// Shortcut pentru a accesa contextul ușor în alte componente
export const useAuth = () => useContext(AuthContext);

