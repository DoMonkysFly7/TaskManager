"use client";

// Importăm unelte de la React și Firebase
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase"; // configurarea Firebase

// 1. Cream contextul global care va ține informațiile despre autentificare
const AuthContext = createContext({
  user: null,               // utilizatorul logat (null dacă nimeni nu e logat)
  loading: true,            // dacă se încarcă starea de autentificare
  logout: async () => {},   // funcția de delogare (va fi completată mai jos)
});

// 2. Furnizorul de autentificare – învelește toată aplicația
export const AuthProvider = ({ children }) => {
  // 3. Variabilele de stare: utilizatorul și starea de încărcare
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. La montarea componentei, verificăm dacă cineva este logat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);     // dacă e logat, setăm userul
      setLoading(false);         // oprirea "loading"-ului
    });

    return unsubscribe; // ne dezabonăm automat când componenta dispare
  }, []);

  // 5. Funcție de delogare: cheamă `signOut` de la Firebase
  const logout = () => signOut(auth);
  
  // 6. Oferim datele despre autentificare tuturor componentelor copil
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children} {/* orice componentă copil: pagini, butoane, etc */}
    </AuthContext.Provider>
  );
};

// 7. Shortcut pentru a accesa contextul ușor în alte componente
export const useAuth = () => useContext(AuthContext);

// children = orice componentă 'copil' din aplicație. Ex: butoane, pagini etc.
