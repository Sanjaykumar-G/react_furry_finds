import axios from "axios";

export const RegisterController = async (userName, userEmail, userPassword) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
            name: userName,
            email: userEmail,
            password: userPassword
        });

        if (response.status === 201) { 
            localStorage.setItem('userData', JSON.stringify(response.data));
            return {
                status: true,
                message: 'Registration successful'
            };
        } else {
            return {
                status: false,
                message: `Unexpected response status: ${response.status}`
            };
        }
    } catch (error) {
        if (error.response) {
            return {
                status: false,
                message: error.response.data || 'An error occurred during registration'
            };
        } else {
            return {
                status: false,
                message: 'Something went wrong'
            };
        }
    }
};
