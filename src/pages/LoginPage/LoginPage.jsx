import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Service from "../../api/Service.js";
import { AuthContext } from "../../components/context";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/Button/MyButton";
import MyInput from "../../components/UI/Input/MyInput";
import cl from "./LoginPage.module.css";

const LoginPage = () => {
    const { setIsAuth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await Service.loginUser(
                formData.email,
                formData.password
            );
            if (response.status === 200) {
                setIsAuth(true);
                localStorage.setItem("auth", "true");
                console.log("Login successful!");
            }
        } catch (error) {
            console.error("Login failed:", error);
            console.log("Login failed. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    if (redirectToRegister) {
        return <Navigate to="/registration" />;
    }

    return (
        <div className={cl.loginPage}>
            <Header title="Вход" showIcons={false} />
            <div className={cl.background}>
                <div className={cl.container}>
                    <h1 className={cl.title}>Вход</h1>
                    <form onSubmit={login} className={cl.form}>
                        <MyInput
                            type="email"
                            name="email"
                            placeholder="Электронная почта @urfu.me"
                            title="Только для сотрудников и студентов УрФУ"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className={cl.passwordContainer}>
                            <MyInput
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className={cl.eyeIcon}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <MyButton>Войти</MyButton>
                    </form>
                    <p className={cl.note}>
                        Ещё нет аккаунта? -{" "}
                        <span
                            className={cl.link}
                            onClick={() => setRedirectToRegister(true)}
                        >
                            Зарегистрироваться
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
