import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const {setUser, googleSignIn} = useAuth();
    const navigate = useNavigate();
    const handleGoogleLogin = () =>{
       googleSignIn().then(result=>{
            setUser(result.user);
            toast.success("Registration successful!");
            navigate('/');
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