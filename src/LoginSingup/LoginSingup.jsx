import "./LoginSingup.css"
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/passworad.png";
import eye_open from "../assets/eye open.png"; 
import eye_close from "../assets/eye close.png"; 
import { useState } from "react";

const LoginSingup = () => {
    const [action, setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateField = (name, value) => {
        let error = '';
        
        switch(name) {
            case 'name':
                if (!value.trim() && action === "Sign Up") {
                    error = 'الاسم مطلوب';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'البريد الإلكتروني مطلوب';
                } else if (!isValidEmail(value)) {
                    error = 'صيغة البريد الإلكتروني غير صحيحة';
                }
                break;
            case 'password':
                if (!value.trim()) {
                    error = 'كلمة المرور مطلوبة';
                } else if (value.length < 6) {
                    error = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
                } else if (formData.confirmPassword && value !== formData.confirmPassword) {
                    setErrors(prev => ({...prev, confirmPassword: 'كلمة المرور غير متطابقة'}));
                }
                break;
            case 'confirmPassword':
                if (!value.trim() && action === "Sign Up") {
                    error = 'تأكيد كلمة المرور مطلوب';
                } else if (value !== formData.password) {
                    error = 'كلمة المرور غير متطابقة';
                }
                break;
        }
        
        setErrors(prev => ({...prev, [name]: error}));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        
        if (errors[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (action === "Sign Up" && !formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
        }
        
        if (!formData.password.trim()) {
            newErrors.password = 'كلمة المرور مطلوبة';
        } else if (formData.password.length < 6) {
            newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        }
        
        if (action === "Sign Up") {
            if (!formData.confirmPassword.trim()) {
                newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (action === "Sign Up") {
                console.log('تسجيل جديد:', formData);
                alert('تم إنشاء الحساب بنجاح!');
            } else {
                console.log('تسجيل الدخول:', {email: formData.email, password: formData.password});
                alert('تم تسجيل الدخول بنجاح!');
            }
            
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrors({});
        }
    };

    const switchMode = (mode) => {
        setAction(mode);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const ConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action === "Sign Up" ? "Sign Up" : "Login"}</div>
                <div className="underline"></div>
            </div>
            
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="اسم المستخدم" />
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                )}
                
                <div className="input">
                    <img src={email_icon} alt="البريد الإلكتروني" />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email Id"
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="input">
                    <img src={password_icon} alt="كلمة المرور" />
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        className={errors.password ? 'error' : ''}
                    />
                    <img 
                        src={showPassword ? eye_open : eye_close} 
                        alt={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        className="eye-icon"
                        onClick={PasswordVisibility}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={password_icon} alt="تأكيد كلمة المرور" />
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Confirm Password"
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        <img 
                            src={showConfirmPassword ? eye_open : eye_close} 
                            alt={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                            className="eye-icon"
                            onClick={ConfirmPasswordVisibility}
                        />
                        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                    </div>
                )}
            </div>
            
            {action === "Login" && (
                <div className="forgot-password">
                    Lost Password? <span>Click Here!</span>
                </div>
            )}
            
            <div className="submit-container">
                <button 
                    className={`submit ${action === "Sign Up" ? "active" : "gray"}`}
                    onClick={() => {
                        if (action === "Sign Up") {
                            handleSubmit();
                        } else {
                            switchMode("Sign Up");
                        }
                    }}
                >
                    Sign Up
                </button>
                <button 
                    className={`submit ${action === "Login" ? "active" : "gray"}`}
                    onClick={() => {
                        if (action === "Login") {
                            handleSubmit();
                        } else {
                            switchMode("Login");
                        }
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginSingup;