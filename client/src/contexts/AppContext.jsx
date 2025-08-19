import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            // Fetch only published blogs for public view
            const {data} = await axios.get("/api/blog/all");
            if (data.success) {
                setBlogs(data.data);
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    };

    const fetchAllBlogs = async () => {
        try {
            // Fetch all blogs (including drafts) for admin view
            const {data} = await axios.get("/api/blog/");
            if (data.success) {
                return data.data;
            } else {
                toast.error(data.message);
                return [];
            }
        } catch(error) {
            toast.error(error.message);
            return [];
        }
    };

    // Validate token and set axios headers
    const validateAndSetToken = (tokenValue) => {
        if (tokenValue) {
            setToken(tokenValue);
            axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;
        } else {
            setToken(null);
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    // Check authentication status on mount
    useEffect(() => {
        fetchBlogs();
        
        // Check for admin token in localStorage
        const adminToken = localStorage.getItem("adminToken");
        
        if (adminToken) {
            // Validate token by making a test request
            validateAndSetToken(adminToken);
            
            // Test token validity with a backend request
            axios.get("/api/admin/dashboard")
                .then(() => {
                    // Token is valid, keep it
                    validateAndSetToken(adminToken);
                })
                .catch(() => {
                    // Token is invalid, remove it
                    localStorage.removeItem("adminToken");
                    validateAndSetToken(null);
                    toast.error("Session expired. Please login again.");
                });
        } else {
            validateAndSetToken(null);
        }
    }, []);

    const value = {
        axios,
        navigate,
        token,
        setToken: validateAndSetToken, // Use the wrapper function
        blogs,
        setBlogs,
        input,
        setInput,
        fetchBlogs,
        fetchAllBlogs
    };

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export default AppContext;