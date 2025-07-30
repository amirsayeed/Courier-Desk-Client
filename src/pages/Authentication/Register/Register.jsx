import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';


const Register = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [showPassword, setShowPassword] = useState(false);
    

    const onSubmit = data => {
        console.log(data)
    }
    
    return (
        <div className='my-20 max-w-md mx-auto'>
            <div className="p-7 rounded-lg shadow-lg bg-base-100 text-base-content border-2 border-primary">
            <h1 className="my-3 text-4xl font-bold text-center">Register</h1>
                
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="text-sm">Name*</label>
                <input type="text" 
                {...register('name', {required: true})}
                placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                {
                    errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                }

                <label className="text-sm mt-2">Photo URL</label>
                <input type="text" 
                {...register('photo')}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />

                <label className="text-sm mt-2">Email address*</label>
                <input type="email" 
                {...register('email', {required: true})} 
                placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"/>
                {
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                }    
                
                <label className="text-sm mt-2">Password*</label> 
                <div className='relative'>      
                <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {required: true, minLength: 6,
                    pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
                    },    
                    })}
                    className="input w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                    placeholder="Password" />
                    <span onClick={() => { setShowPassword(!showPassword) }}
                        className='absolute top-3 right-8'>
                    {
                        showPassword ? <FaEyeSlash size={20}/>: <FaEye size={20}/>
                    }
                    </span>
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must contain at least one uppercase, one lowercase letter, and one number</p>
                    }
                </div>

                <p className="my-1 text-sm text-center text-base-content">Already have an account?
                <Link to='/login' className="hover:underline text-primary-content"> Login</Link>
                </p>
                <button type='submit' className="btn w-full btn-primary  rounded-md">Register</button>
            </form>
            <SocialLogin/>
            
            </div>
        </div>
    );
};

export default Register;