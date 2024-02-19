import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, updateEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app} from '../Firebase'

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate= useNavigate();

    // Firebase auth instance
    const auth = getAuth(app);

    // Sign up function
    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCurrentUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    // Log in function
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCurrentUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    // Update email function
    const updateEmailHandler = async (email) => {
        try {
            await updateEmail(auth.currentUser, email);
            navigate('/'); // Redirect to home page after updating email
        } catch (error) {
            throw error;
        }
    };

    // Update password function
    const updatePasswordHandler = async (password) => {
        try {
            await updatePassword(auth.currentUser, password);
            navigate('/'); // Redirect to home page after updating password
        } catch (error) {
            throw error;
        }
    };

    // Log out function
    const logout = () => auth.signOut();

    // Effect hook to set up authentication listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [auth]);

    // Authentication context value
    const value = {
        currentUser,
        signup,
        login,
        logout,
        updateEmail: updateEmailHandler,
        updatePassword: updatePasswordHandler,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
