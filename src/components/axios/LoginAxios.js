import axios from "axios";

export const loginController = async (userEmail, userPassword) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            email: userEmail,
            password: userPassword
        });

        if (response.status === 200) {
            localStorage.setItem('userData', JSON.stringify(response.data));
            return {
                status: true,
                message: 'Login successful'
            };
        }
        
        return {
            status: false,
            message: 'Email or Password is Invalid'
        };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {
                status: false,
                message: 'Email or Password is Invalid'
            };
        }
        return {
            status: false,
            message: 'Something went wrong'
        };
    }
};
