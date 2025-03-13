import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST_API } from "../../constants/PathUri";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [access_token, setToken] = useState(localStorage.getItem("access_token") || "");
    // const [loading, setLoading] = useState(true); // 🔹 Thêm loading để kiểm tra xong mới render
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            getCurrentUser();
        } else {
            logoutAction(); 
        }
    }, [access_token]);

    const getCurrentUser = async () => {
        try {
                const response = await axios.get(`${HOST_API}/user/me`, {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            if (response.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            console.error("Get current account error:", error);
            logoutAction(); // 🔹 Nếu lỗi → Logout
        }
    };

    const logoutAction = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("access_token");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ access_token, user, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);



    // const loginAction = async (username, password) => {
    //     try {
    //         const response = await axios.post("http://localhost:8000/api/auth/login", {
    //             username,
    //             password
    //         });

    //         if (response.status === 200) {
    //             const token = response.data.data.access_token;
    //             localStorage.setItem("access_token", token);
    //             setToken(token);
    //             navigate("/category");
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         throw error.response?.data?.msg || "Đăng nhập thất bại!";
    //     }
    // };

    // const signupAction = async (fullname, username, password, confirmPassword) => {
    //     if (password !== confirmPassword) {
    //         throw "Passwords do not match";
    //     }

    //     try {
    //         await axios.post("http://localhost:8000/api/auth/", {
    //             fullname,
    //             username,
    //             password,
    //             role: "user"
    //         });

    //         return "Tạo tài khoản thành công! Vui lòng đăng nhập.";
    //     } catch (error) {
    //         console.error("Signup error:", error);
    //         throw error.response?.data?.msg || "Đăng ký thất bại!";
    //     }
    // };