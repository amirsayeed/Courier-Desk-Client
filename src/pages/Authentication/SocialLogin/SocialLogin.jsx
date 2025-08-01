import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const {setUser, googleSignIn} = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const location = useLocation();
    const handleGoogleLogin = () =>{
       googleSignIn()
       .then(async(result)=>{
            const user = result.user;

            const userInfo = {
                name: user.displayName,
                email: user.email,
                role: 'customer', 
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            const userRes = await axiosInstance.post('/users',userInfo);
            console.log(userRes.data);

            setUser(result.user);
            toast.success("Registration successful!");
            navigate(`${location?.state ? location.state : '/'}`);
        })
        .catch(error=>{
            console.log(error);
            toast(error.message);
        })
    }

    return (
         <div className="flex flex-col gap-2">
            <div className="flex items-center w-full my-1">
                <hr className="w-full" />
                <p className="px-3 text-base-content">OR</p>
                <hr className="w-full" />
            </div>
            <div>
                <button onClick={handleGoogleLogin} className="btn w-full btn-primary">
                <FcGoogle size={20}/> Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;