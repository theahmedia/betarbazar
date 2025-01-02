import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login submitted");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                {/* Page Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Login</h2>
                    <button className="text-gray-600 hover:text-black">
                        <IoMdClose />
                    </button>
                </div>
                {/* Page Content */}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username here..."
                            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password here..."
                                className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-md mb-2 text-gray-600">
                            Not registered?{' '}
                            <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => navigate('/register')}
                            >
                                Click here to register
                            </span>
                        </p>
                        <p className="text-sm text-gray-600">
                            <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => navigate('/resetPass')}
                            >
                                Forgot password?
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
